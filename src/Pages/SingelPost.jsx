import axios from 'axios'
import classes from "../style/singelpost.module.css"
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContex } from '../hook/useGlobalContext'
import SideBar from './home/sidebar/SideBar'
import Feed from './home/Feed/Feed'
import io, { Socket } from "socket.io-client"
import PostShare from '../components/postShare/PostShare'

export default function SingelPost() {

    const soket = io.connect("http://localhost:5000")
    const { id } = useParams()
    const { user } = useGlobalContex()
    const { loader, setLoader } = useGlobalContex()
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const [comment, setComment] = useState([])
    const [commentRealTime, setCommentRealTime] = useState([])
    const [comText, setComText] = useState("")

    const [info, setInfo] = useState({ text: "", postImg: "", user: "", id: "" })

    useEffect(() => {
        fetchPost(id)
    }, [id])

    // fetch post with the post id
    const fetchPost = async (id) => {
        try {
            setLoader(true)
            const { data } = await axios.get(`http://localhost:5000/api/post/singel/${id}`)
            if (data.success === true) {
                setData(data.result)
                fetchPost(false)
            }

        } catch (error) {
            setLoader(false)
        }
    }

    // handel delete funtion
    const handelDelete = (id) => {
        fetch(`http://localhost:5000/api/post/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert("succesfuly delete")
                    navigate("/")
                }
            })
    }

    // handel update the post
    const handelUpdate = () => {
        setUpdate(true)
        const editDoc = data[0]
        setInfo({ text: editDoc.text, postImg: editDoc.postImg, user: editDoc._id, id })
    }

    // handel comment section
    const handelComment = async () => {
        if (comText) {
            const comm = {
                text: comText,
                postBy: user?._id
            }

            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };

            const { data } = await axios.post(`http://localhost:5000/api/post/comment/${id}`, comm, config)
            setComment(data.post.comment)
            setComText("")
            soket.emit("comment", data.post.comment)

        }
    }
    useEffect(() => {
        soket.on("newComment", (msg) => {
            setCommentRealTime(msg)
        })
    }, [])

    let uiComment = commentRealTime.length > 0 ? setCommentRealTime : data[0]?.comment

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <SideBar></SideBar>
            </div>
            <div className={classes.feed}>
                {update && <PostShare info={info} fetchPost={fetchPost}></PostShare>}
                {loader && data ? <h3>loading..</h3> : <Feed posts={data}></Feed>}
            </div>
            {data[0]?.user?._id === user?._id &&
                <div className={classes.btnGrup}>
                    <button onClick={() => handelDelete(id)}>Delete</button>
                    <button onClick={() => handelUpdate(id)}>Update</button>
                </div>
            }
            <div className={classes.commContainer}>
                <h2>Add a comment:</h2>
                <input type="text" onChange={(e) => setComText(e.target.value)} placeholder='add something' className={classes.comment} />
                <button onClick={handelComment} className={classes.comBtn}>comment</button>

                {uiComment?.map(comment => <div className={classes.commContainer} key={comment._id}>
                    <div className={classes.commentinfo}>
                    <img className={classes.commentImg} src={`http://localhost:5000/Images/${comment?.postBy?.userImg}`} alt="" />
                    <div>
                        <h2>{comment?.postBy?.name}</h2>
                        <p>{comment?.text}</p>
                    </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
