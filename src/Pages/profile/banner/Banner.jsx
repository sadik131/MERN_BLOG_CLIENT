import "./banner.css"
import banner from "../../../assets/banner.jpg"
import { useGlobalContex } from "../../../hook/useGlobalContext"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

export default function Banner() {

  const [file, setFile] = useState(null)
  const proRef = useRef(null)
  const { user ,loadUser} = useGlobalContex()

  useEffect(() => {
    if (file) {
      uploadImg()
    }
  }, [file])

  const uploadImg = async () => {
    const fromdata = new FormData()
    fromdata.append("file", file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post("http://localhost:5000/upload", fromdata, config)
    console.log(data)
    if (data) {
      fetch("http://localhost:5000/api/register", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({id:user._id,userImg:data})
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.success){
          loadUser()
        }
      })
    }
  }

  return (
    <div className="bannerContainer">
      <img className="banner" src={banner} alt="" />
      <img className="bannerUser" onClick={() => proRef.current.click()} src={`http://localhost:5000/Images/${user?.userImg}`} alt="" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} hidden ref={proRef} />
      <div className="profileInfo">
        <h4 className="userName">{user.name}</h4>
        <h4 className="userBio">{user.bio}</h4>
      </div>
    </div>
  )
}
