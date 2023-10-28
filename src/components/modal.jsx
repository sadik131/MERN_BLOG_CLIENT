import React from 'react';
import { ImCross } from 'react-icons/im';
import classes from "../style/postFild.module.css"
import { useGlobalContex } from '../hook/useGlobalContext';
import Input from './input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import unUser from "../assets/user.jpg"

const Modal = ({ modal, title, button, fetchPost }) => {
    const navigate = useNavigate()
    const { user, setFile, file, setPost, post } = useGlobalContex()

    const handelPost = (e) => {
        e.preventDefault()
        const fromData = new FormData()
        fromData.append("file", file)
        fromData.append("text", post)
        fromData.append("user", user._id)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const url = "http://localhost:5000/upload"

        axios.post(url, fromData, config).then((response) => {
            if (response.data.success == true) {
                modal(false)
                navigate("/profile")
                fetchPost()
            }
        });
    }

    const handelEditPost = (e) => {
        e.preventDefault()
        console.log("edit")
    }

    return (
        <div className={classes.modal}>
            <div className={classes.header}>
                <div>
                    <img src={user.userImg ? `http://localhost:5000/Images/${user?.userImg}` : unUser} className={classes.user} alt="" />
                    <h1>{user.name}</h1>
                </div>
                <ImCross onClick={() => modal(false)}></ImCross>
            </div>
            <div className='border' />
            <div className={classes.postFild}>
                <h1>{title}</h1>
                <div className={classes.form}>
                    <form onSubmit={handelPost}>
                        <textarea
                            onChange={(e) => setPost(e.target.value)}
                            className={classes.textFild}
                            cols="100" rows="10"></textarea>
                        <Input onChange={(e) => setFile(e.target.files[0])} type="file" className={classes.fileFild}></Input>
                        <button type='submit'>{button}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;
