import React, { useContext, useEffect, useState } from "react"

const ReactContex = React.createContext()


const AppProvider = ({ children }) => {
    const [error, seterror] = useState('');
    const [user, setuser] = useState(null);
    const [name, setName] = useState('');
    const [token, settoken] = useState('');
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState(null)
    const [post, setPost] = useState("")
    const [words, setWords] = useState("")




    // load user data useing store token
    const jwToken = localStorage.getItem('accessToken');

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        if (jwToken) {
            fetch("http://localhost:5000/user", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${jwToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.json())
                .then(result => {
                    setuser(result[0])
                    setName(result[0].name)
                })
        }

        else {
            setuser(null)
        }
    }

    const values = {
        user, setuser, error, words, setWords, seterror, token, loadUser, settoken, name, setName, loader, setLoader, file, setFile, post, setPost
    }
    return <ReactContex.Provider value={values}>{children}</ReactContex.Provider>
}


const useGlobalContex = () => {
    return useContext(ReactContex)
}


export { ReactContex, AppProvider, useGlobalContex }