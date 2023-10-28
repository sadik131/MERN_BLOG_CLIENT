import React, { useState } from 'react';
import Input from '../components/input';
import Button from '../components/button';
import { useGlobalContex } from '../hook/useGlobalContext';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const navigate = useNavigate()

    // global state
    const { setuser, user, loader, setLoader } = useGlobalContex()

    // user registration from
    const handelfrom = (e) => {
        e.preventDefault()
        setLoader(true)
        try {
            fetch("http://localhost:5000/api/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(res => res.json())
                .then(result => {
                    if (result.success === true) {
                        setLoader(false)
                        navigate("/login")
                        setname("")
                        setemail("")
                        setpassword("")
                    }
                    

                })
        } catch (error) {
            console.log(error)
        }
    }

    if (user) {
        return navigate("/")
    }

    return (
        <div className='login'>
            <h1>Sign up</h1>
            <form onSubmit={handelfrom}>
                <Input onChange={(e) => setname(e.target.value)} type="text" className="input" placeholder="Enter Name"></Input>
                <Input onChange={(e) => setemail(e.target.value)} type="text" className="input" placeholder="Enter email"></Input>
                <Input onChange={(e) => setpassword(e.target.value)} type="password" className="input" placeholder="Enter password"></Input>
                <Button disabled={loader} type="submit" className="primary">Sign up</Button>
                <p className='loginText'>Already have an account <Link className='loginLink' to="/login">log In</Link></p>
            </form>
        </div>
    );
}

export default Signin;
