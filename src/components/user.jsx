import React, { useEffect, useRef, useState } from 'react';
import classes from "../style/profile.module.css"
import { useGlobalContex } from '../hook/useGlobalContext';
import { useNavigate } from 'react-router-dom';
import EditPro from './editPro';
import axios from 'axios';
import unUser from "../assets/user.jpg"

const User = () => {
    const { user ,loadUser} = useGlobalContex()
    const [edit, setEdit] = useState(false)
    const [file, setFile] = useState(undefined)
    const navigate = useNavigate()
    const userRef = useRef(null)

    useEffect(() => {
        if (file) {
            uploadProfile()
        }
    }, [file])

    const uploadProfile = () => {
        const fromdata = new FormData()
        fromdata.append("file", file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.patch(`http://localhost:5000/profile/${user._id}`, fromdata, config)
            .then(res => {
                if(res.status === 200){
                    loadUser()
                    console.log(res)
                }
            })
            .catch(err => console.log(err))
    }

    if (!user) {
        navigate("/login")
    }
    return (
        <>
            <div className={classes.proContainer}>
                <form>
                    <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={userRef} hidden />
                    <img onClick={() => userRef.current.click()} className={classes.profilePic} src={user.userImg?`http://localhost:5000/Images/${user?.userImg}`:unUser} alt="" />
                </form>
                <div className={classes.info}>
                    <h1>
                        {user?.name}
                    </h1>
                    <p>{user.bio}</p>
                </div>
                <button onClick={() => setEdit(true)}>edit</button>
            </div>
            <div className='border' />
            {edit && <EditPro modal={setEdit} />}
        </>
    );
}

export default User;
