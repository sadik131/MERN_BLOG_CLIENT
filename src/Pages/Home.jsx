import React, { useEffect, useState } from 'react';
import Nav from '../components/nav/Nav';
import Post from '../components/Post';
import PostFild from '../components/postFild';
import { useGlobalContex } from '../hook/useGlobalContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const [posts, setPost] = useState([])
    const {user} = useGlobalContex()

    useEffect(() => {
        fetch("http://localhost:5000/api/post")
            .then(res => res.json())
            .then(data => setPost(data.result))
    }, [])

       
    return (
        <div className='main-container'>
            <div className="right-container">
               
            </div>
            <div className='container'>
                <Post posts={posts}></Post>
            </div>
            <div className='left-container'>left section</div>
        </div>
    );
}

export default Home;
