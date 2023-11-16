import { useGlobalContex } from "../../hook/useGlobalContext"
import { FaLocationArrow } from "react-icons/fa"
import { BsFillEmojiLaughingFill, BsFileImage, BsFillTagFill } from "react-icons/bs"
import { AiFillCloseCircle } from "react-icons/ai"
import classes from "./PostShare.module.css"
import unuser from "../../assets/user.jpg"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

export default function PostShare({ data, info,fetchPost }) {

    const { user } = useGlobalContex()
    const [file, setFile] = useState(null)
    const [post, SetPost] = useState("")
    const [img, setImg] = useState("")
    const fileRef = useRef(null)
    const [fild, setFild] = useState(false)
    // console.log(img)

    useEffect(() => {
        if (file) {
            uploadPost()
        }
    }, [file])

    // upload a photo
    const uploadPost = async () => {
        const fromdata = new FormData()
        fromdata.append("file", file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post("http://localhost:5000/upload", fromdata, config)
        setImg(data)
        setFild(true)
    }

    // post from handeler
    const handelFromSubmit = async (e) => {
        e.preventDefault()
        if (info?.id) {
            const data = {
                text: post,
                user: user._id,
                postImg: img
            }
            fetch(`http://localhost:5000/api/post/${info.id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)

            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert("edit")
                        setFild(false)
                        fetchPost(info.id)
                    }
                })
        }
        else {
            const data = {
                text: post,
                user: user._id,
                postImg: img
            }

            fetch("http://localhost:5000/api/post", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)

            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert("Publish")
                        setFild(false)
                        // userProfilePost()
                    }
                })
        }
    }



    return (
        <form onSubmit={handelFromSubmit} className={classes.container}>
            <div className={classes.postFile}>
                <img className={classes.userImg}
                    src={user?.userImg ? `http://localhost:5000/Images/${user?.userImg}` : unuser}
                    alt="" />
                <input type="text" onChange={(e) => SetPost(e.target.value)} placeholder={`What's in your mind ${user ? user.name : ""}`} />
            </div>
            <div className={classes.row}></div>
            <div className={classes.buttons}>
                <div className={classes.button} onClick={() => fileRef.current.click()}>
                    <BsFileImage className={classes.imageFile} />
                    <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} ref={fileRef} />
                    <h4>Photo or Video</h4>
                </div>
                <div className={classes.button}>
                    <BsFillTagFill className={classes.file} />
                    <h4>Tag</h4>
                </div>
                <div className={classes.button}>
                    <FaLocationArrow className={classes.location} />
                    <h4>Location</h4>
                </div>
                <div className={classes.button}>
                    <BsFillEmojiLaughingFill className={classes.emoji} />
                    <h4>Feelings</h4>
                </div>
                <button type="submit" className={classes.sharebtn}>Share</button>
            </div>
            {fild && <img className={classes.postImg} src={`http://localhost:5000/Images/${img ? img : info.postImg}`} alt="" />}
            <AiFillCloseCircle className={classes.closeSwg} />
        </form>
    )
}
