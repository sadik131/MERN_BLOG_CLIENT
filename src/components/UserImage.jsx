import React from 'react'
import { useGlobalContex } from '../hook/useGlobalContext'
import unUser from "../assets/user.jpg"

export default function UserImage() {
    const { user } = useGlobalContex()
    return (
        <div>
            <img src={user ? `http://localhost:5000/Images/${user?.userImg}` : unUser} className='user' />
        </div>
    )
}
