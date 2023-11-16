import React, { useState } from 'react';
import classes from "./Feed.module.css"
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai"
import { BiShare } from "react-icons/bi"
import Modal from '../../../components/modal';
import { useGlobalContex } from '../../../hook/useGlobalContext';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const Feed = ({ posts}) => {
    const { words } = useGlobalContex()
    const [modal, setModal] = useState(false)
    const [like, setLike] = useState(false)
// console.log(posts)
    return (
        <>
            {posts?.filter(user=>user.user?.name.toLowerCase().includes(words)).map(post => {
                
                return <Link key={post?._id} to={`singelPost/${post?._id}`}><div className={classes.postContainer}>
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
                <div className='likeComment'>
                    <span onClick={() => setLike(!like)}>{like ? <AiFillLike className='facebookLike' /> : <AiOutlineLike />}</span>
                    <span><AiOutlineComment /></span>
                    <span><BiShare /></span>
                </div>
            </div></Link>
            })}
            {modal && <Modal modal={setModal} setUpdate={setUpdate} title="Edit the post here" button="Update"></Modal>}
        </>
    );
}

export default Feed;
