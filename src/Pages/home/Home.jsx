import React, { useEffect, useState } from 'react';
import { useGlobalContex } from '../../hook/useGlobalContext';
import SideBar from './sidebar/SideBar';
import Rightbar from './rightBar/Rightbar';
import Feed from './Feed/Feed';
import "./home.css"
import Loader from '../../components/Loader';
import PostShare from '../../components/postShare/PostShare';
import Pagination from '../../components/Pagination';

const Home = () => {
    const [posts, setPost] = useState([])
    const { loader, setLoader ,words} = useGlobalContex()
    const [current, setCurrent] = useState(1)
    const [postParPage, setpostParPage] = useState(100)

    // get current Post
    const indexOfLastPost = current * postParPage
    const indexOfFirstPost = indexOfLastPost - postParPage
    const currentPosts = posts.slice(indexOfFirstPost , indexOfLastPost)

    useEffect(() => {
        setLoader(true)
        fetch("http://localhost:5000/api/post")
            .then(res => res.json())
            .then(data => {
                setPost(data.result.sort((a,b)=>{
                    return new Date(b.createdAt) - new Date(a.createdAt)
                }))
                setLoader(false) 
            })
    }, [])
    // change page
    const paginate = number => setCurrent(number)

    return (
        <div className='main-container'>
            <div className="right-container">
                <SideBar></SideBar>
            </div>
            <div className='container'>
                <PostShare />
                {loader ? <Loader /> : <Feed posts={currentPosts}></Feed>}
                <Pagination postParPage={postParPage} totalPost={posts.length} paginate={paginate} />
            </div>
            <div className='left-container'>
                <Rightbar></Rightbar>
            </div>
        </div>
    );
}

export default Home;
