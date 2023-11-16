import "./Uinformation.css"
import img1 from "../../../assets/product_10.png"

export default function Uinformation() {
    return (
        <div className="infoContainer">
            <h2>User Information</h2>
            <div className="info">
                <div className="mation">
                    <h3>City :</h3>
                    <p>New Yourk</p>
                </div>
                <div className="mation">
                    <h3>From :</h3>
                    <p>Roman</p>
                </div>
                <div className="mation">
                    <h3>Relationship :</h3>
                    <p>Singel</p>
                </div>
            </div>
            <div className="Friendlist">
                <h2>User friends</h2>
                <div className="list">
                    <div className="Profriend">
                        <img clas src={img1} alt="" />
                        <h3>jocob Wisi</h3>
                    </div>
                    <div className="Profriend">
                        <img clas src={img1} alt="" />
                        <h3>jocob Wisington</h3>
                    </div>
                    <div className="Profriend">
                        <img clas src={img1} alt="" />
                        <h3>jocob Wisington</h3>
                    </div>
                    <div className="Profriend">
                        <img clas src={img1} alt="" />
                        <h3>jocob Wisington</h3>
                    </div>
                    <div className="Profriend">
                        <img clas src={img1} alt="" />
                        <h3>jocob Wisington</h3>
                    </div>
                    <div className="Profriend">
                        <img clas src={img1} alt="" />
                        <h3>jocob Wisington</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
