import React, { useEffect, useState } from 'react';
import classes from "../style/post.module.css"
import { useGlobalContex } from '../hook/useGlobalContext';
import Modal from './modal';
import axios from 'axios';
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai"
import { BiShare } from "react-icons/bi"
// import { io } from "socket.io-client"

const Post = ({ posts, handelDelete }) => {

    // useEffect(() => {
    //     console.log("socket IO", socket)
    // }, [])

    const { user } = useGlobalContex()
    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState({})
    const [like, setLike] = useState(false)

    // delete function


    // edit post with id
    const handelEditPost = (id) => {
        // console.log(post, file)
        setModal(true)
        // console.log(update)
        // const fromData = new FormData()
        // fromData.append("file", file)
        // fromData.append("text", post)
        // fromData.append("user", user._id)
        // setModal(true)

        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //     },
        // };
        // const url = `http://localhost:5000/upload/${id}`
        // const res = axios.patch(url,fromData,config,)
    }

    return (
        <>
            {posts?.map(post => {
                
                return <div key={post._id} className={classes.postContainer}>
                    <div className={classes.postCard}>
                        <div className={classes.cardHeader}>
                            <img className={classes.user} src={`http://localhost:5000/Images/${post.user?.userImg}`} alt="user" />
                            <div>
                                <h4>{post.user.name}</h4>
                                <p>8 am</p>
                            </div>
                        </div>
                        {user?._id === post.user._id && <div>
                            <button onClick={() => handelDelete(post?._id)} className={classes.button}>delete</button>
                            <button onClick={() => handelEditPost(post?._id)} className={classes.button}>edit</button>
                        </div>
                        }
                    </div>
                    <div className="border" />
                    <div className={classes.post}>
                        <p>{post.text}</p>
                        <img className={classes.img} src={`http://localhost:5000/Images/${post.postImg}`} alt="user" />
                    </div>
                    <div className="border"></div>
                    <div className='likeComment'>
                        <span onClick={() => setLike(!like)}>{like ? <AiFillLike className='facebookLike' /> : <AiOutlineLike />}</span>
                        <span><AiOutlineComment /></span>
                        <span><BiShare /></span>
                    </div>
                </div>
            })}
            {modal && <Modal modal={setModal} setUpdate={setUpdate} title="Edit the post here" button="Update"></Modal>}
        </>
    );
}

export default Post;
