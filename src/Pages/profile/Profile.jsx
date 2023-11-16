import React, { useEffect, useState } from 'react';
import "./profile.css"
import axios from 'axios';
import SideBar from '../home/sidebar/SideBar';
import Feed from '../home/Feed/Feed';
import { useGlobalContex } from '../../hook/useGlobalContext';
import Loader from '../../components/Loader';
import Uinformation from './Uinformation/Uinformation';
import Banner from './banner/Banner';
import PostShare from '../../components/postShare/PostShare';

const Profile = () => {
    const { user, loader } = useGlobalContex()
    const [posts, setPosts] = useState([]);

    // get post with userId
    const userProfilePost = async () => {
        const res = await axios.get(`http://localhost:5000/api/post/${user._id}`)
        setPosts(res.data.result.sort((a,b)=>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        }))
    }

    useEffect(() => {
        userProfilePost()
    }, [])

    return (

        <div className='main-container'>
            <div className="right-container">
                <SideBar></SideBar>
            </div>
            <div className='proContainer'>
                <div className="containertop">
                    <Banner></Banner>
                </div>
                <div className='leftContainer'>
                    <div className='feedContainer'>
                        <PostShare userProfilePost={userProfilePost} />
                        {loader ? <Loader /> : <Feed posts={posts}></Feed>}
                    </div>
                    <Uinformation />
                </div>
            </div>
        </div>
    );
}

export default Profile;
