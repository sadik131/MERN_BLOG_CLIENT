import "./Rightbar.css"
import gift from "../../../assets/gift.png"
import ads from "../../../assets/ad.png"
import user1 from "../../../assets/product_10.png"

export default function Rightbar() {
  return (
  <>
      <div className="notification">
        <div className="text">
          <img src={gift} alt="" />
          <p>
            <b>Pola Foster </b>and
            <b> 3 other friends</b> have a birthday</p>
        </div>
        <div className="ads">
          <img src={ads} alt="" />
        </div>
        <div className="friendList">
          <h2>Online Friends</h2>
          <div className="friend">
            <span className="active"></span>
            <img src={user1} alt="" />
            <h3>Safak Kocaoglu</h3>
          </div>
          <div className="friend">
            <span className="active"></span>
            <img src={user1} alt="" />
            <h3>Safak Kocaoglu</h3>
          </div>
          <div className="friend">
            <span className="active"></span>
            <img src={user1} alt="" />
            <h3>Safak Kocaoglu</h3>
          </div>
        </div>
      </div>
  </>
  )
}
  