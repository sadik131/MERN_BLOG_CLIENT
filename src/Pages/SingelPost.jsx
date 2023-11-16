import axios from 'axios'
import classes from "../style/singelpost.module.css"
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContex } from '../hook/useGlobalContext'
import SideBar from './home/sidebar/SideBar'
import Feed from './home/Feed/Feed'
import PostShare from '../components/postShare/PostShare'

export default function SingelPost() {

    const { id } = useParams()
    const { user } = useGlobalContex()
    const { loader, setLoader } = useGlobalContex()
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const [info, setInfo] = useState({ text: "", postImg: "", user: "" ,id:""})

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
        setInfo({ text: editDoc.text, postImg: editDoc.postImg, user: editDoc._id ,id})
    }
        // console.log(info)

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
        </div>
    )
}
