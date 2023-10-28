import React, { useState } from 'react';
import classes from "../style/postFild.module.css"
import Input from './input';
import Modal from './modal';
import { useGlobalContex } from '../hook/useGlobalContext';
import unUnsr from '../assets/user.jpg';

const PostFild = ({fetchPost}) => {
    const { user } = useGlobalContex()
    const [modal, setModal] = useState(false)

    return (
        <>
            <div className={classes.container}>
                <img src={user.userImg?`http://localhost:5000/Images/${user?.userImg}`:unUnsr} className={classes.user}alt='user' />
                <Input
                    onFocus={() => setModal(true)}
                    placeholder="Create a post"
                    type="text"
                    className={classes.class}></Input>
                <div>c</div>
                {modal && <Modal fetchPost={fetchPost} modal={setModal} title="Create a post here" button="Publish Post"></Modal>}
            </div>
        </>
    );
}

export default PostFild;
