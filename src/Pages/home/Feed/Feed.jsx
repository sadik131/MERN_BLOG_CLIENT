import React, { useEffect, useState } from 'react';
import classes from "./Feed.module.css"
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai"
import { BiShare } from "react-icons/bi"
import Modal from '../../../components/modal';
import { useGlobalContex } from '../../../hook/useGlobalContext';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { io } from 'socket.io-client';

const soket = io.connect("http://localhost:5000")


const Feed = ({ posts }) => {
    const { words, user } = useGlobalContex()
    const [modal, setModal] = useState(false)
    const [like, setLike] = useState(false)
    const [addLike, setaddLike] = useState([])
    const [disLike, setdisLike] = useState([])

    // handel like function
    const handelLike = (post) => {
        fetch(`http://localhost:5000/api/post/like/${post._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ user: user._id })
        })
            .then(res => res.json())
            .then(data => {
            })
    }

    // handel dislike
    const handelDislike = (post) => {
        fetch(`http://localhost:5000/api/post/disLike/${post._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ user: user._id })
        })
            .then(res => res.json())
            .then(data => {
            })
    }

    useEffect(() => {
        soket.on("add-like", (like) => setaddLike(like))
        soket.on("dis-like", (like) => setdisLike(like))
    }, [])

    const uiPost = addLike.length > 0 ? addLike : disLike.length > 0 ? disLike : posts

    return (
        <>
            {posts?.filter(user => user.user?.name.toLowerCase().includes(words)).map(post => {

                return <div key={post?._id} to={`singelPost/${post?._id}`}>
                    <div className={classes.postContainer}>

                        <Link to={`singelPost/${post?._id}`}>
                            <div className={classes.postCard}>
                                <div className={classes.cardHeader}>
                                    <img className={classes.user} src={`http://localhost:5000/Images/${post.user?.userImg}`} alt="user" />
                                    <div>
                                        <h4>{post?.user?.name}</h4>
                                        <p>{format(post.createdAt)}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="border" />
                            <div className={classes.post}>
                                <p>{post.text}</p>
                                <img className={classes.img} src={`http://localhost:5000/Images/${post.postImg}`} alt="user" />
                            </div>
                            <div className="border"></div>
                        </Link>

                        <div className='likeComment'>
                            <span>{like ? <AiFillLike onClick={() => handelDislike(post)} className='facebookLike' /> : <AiOutlineLike onClick={() => handelLike(post)} />}</span>
                            <Link to={`singelPost/${post?._id}`}> <span><AiOutlineComment /></span> </Link>
                            {/* <span>{like? <AiFillLike onClick={() => handelDislike(post)} className='facebookLike' />  :<AiOutlineLike onClick={() => handelLike(post)} />}</span>
                        <Link to={`singelPost/${post?._id}`}> <span><AiOutlineComment /></span> </Link> */}
                            <span><BiShare /></span>
                        </div>
                    </div>
                </div>
            })}
            {modal && <Modal modal={setModal} setUpdate={setUpdate} title="Edit the post here" button="Update"></Modal>}
        </>
    );

}

export default Feed;
