import React, { useEffect, useState } from 'react';
import banner from "../assets/banner.jpg"
import classes from "../style/profile.module.css"
import User from '../components/user';
import Post from '../components/Post';
import { useGlobalContex } from '../hook/useGlobalContext';
import PostFild from '../components/postFild';
import axios from 'axios';

const Profile = () => {
    const { user } = useGlobalContex()
    const [posts, setPosts] = useState([]);
    
    const userProfilePost = async()=>{
        const res = await axios.get(`http://localhost:5000/api/post/${user._id}`)
        setPosts(res.data.result)
    }

    useEffect(() => {
        userProfilePost()
    }, [])

    // delete user post
    const handelDelete = (id) => {
        fetch(`http://localhost:5000/api/post/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                alert("post is delete .refresh page")
                userProfilePost()
            })
    }

    return (
        <div className={classes.container}>
            <img className={classes.banner} src={banner} alt="" />
            <User></User>
            <PostFild fetchPost={userProfilePost}></PostFild>
            {posts?.length === 0 ? <h1>You Don't Create Posts</h1> : <Post handelDelete={handelDelete} posts={posts}></Post>}
        </div>
    );
}

export default Profile;
