import React, { useState } from 'react';
import classes from "../style/editpro.module.css"
import { ImCross } from 'react-icons/im';
import { useGlobalContex } from '../hook/useGlobalContext';
import Input from './input';

const EditPro = ({ modal }) => {
    const { user,loadUser } = useGlobalContex()
    const [bio, setBio] = useState(user.bio)
    const [name, setName] = useState(user.name)

    const handelFrom = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/api/register", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, bio: bio, id: user._id })
        })
            .then(res => res.json())
            .then(data => {
                if(data.success === true) {
                    modal(false)
                    alert("update")
                    loadUser()
                }
                if(data.success === false) return alert("can't update")

            })
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <img src={`http://localhost:5000/Images/${user?.userImg}`} className={classes.user} alt="" />
                <ImCross onClick={() => modal(false)}></ImCross>
            </div>
            <form onSubmit={handelFrom}>
                <Input onChange={(e) => setName(e.target.value)} type="text" value={name}></Input>
                <Input type="text" placeholder="write a bio" onChange={(e) => setBio(e.target.value)}></Input>
                <button type="submit">save</button>
            </form>
        </div >
    );
}

export default EditPro;
