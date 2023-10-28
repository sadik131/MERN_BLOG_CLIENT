import React, { useState } from 'react';
import Input from '../components/input';
import Button from '../components/button';
import { useGlobalContex } from '../hook/useGlobalContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const {user} = useGlobalContex()
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const { error, seterror, setuser ,loader, setLoader } = useGlobalContex()
    const navigate = useNavigate()

    // user registration from
    const handelForm = (e) => {
        e.preventDefault()
        setLoader(true)
        fetch("http://localhost:5000/api/register/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(result => {
                if (result.success === false) {
                    setLoader(false)
                    return seterror(result.message)
                }
                else {
                    setuser(result.user)
                    setLoader(false)
                    localStorage.setItem("accessToken", result.token)
                    seterror("")
                    navigate("/")
                }
            })
    }

    if(user){
      navigate("/")
    }

    return (
        <div className='login'>
            <h1>log in</h1>
            <form onSubmit={handelForm}>
                <Input onChange={(e) => setemail(e.target.value)} type="text" className="input" placeholder="Enter email"></Input>
                <Input onChange={(e) => setpassword(e.target.value)} type="password" className="input" placeholder="Enter password"></Input>
                <Button disabled={loader} type="submit" className="primary">login</Button>
                {error && <p className='error'>{error}</p>}
                <p className='loginText'>New User <Link className='loginLink' to="/signin">create account</Link></p>
            </form>
        </div>
    );
}

export default Login;
