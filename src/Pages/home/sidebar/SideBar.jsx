import "./Sidebar.css"
import { MdRssFeed } from "react-icons/md"
import { HiAcademicCap, HiUserGroup } from "react-icons/hi"
import { BsCalendar2EventFill, BsFillQuestionCircleFill, BsFillBookmarkPlusFill, BsFillCameraVideoFill, BsFillChatFill, BsFillBagFill } from "react-icons/bs"
import friend from "../../../assets/friend.jpg"

const listLink = [
  { id: 1, feld: "Feed", icon: <MdRssFeed /> },
  { id: 2, feld: "Chat", icon: <BsFillChatFill /> },
  { id: 3, feld: "Groups", icon: <HiUserGroup /> },
  { id: 4, feld: "Book Marks", icon: <BsFillBookmarkPlusFill /> },
  { id: 5, feld: "Questions", icon: <BsFillQuestionCircleFill /> },
  { id: 6, feld: "Jobs", icon: <BsFillBagFill /> },
  { id: 7, feld: "Events", icon: <BsCalendar2EventFill /> },
  { id: 8, feld: "Courses", icon: <HiAcademicCap /> },
  { id: 9, feld: "Videos", icon: <BsFillCameraVideoFill /> },
]

export default function SideBar() {
  return (
    <div className="sideContainer">
      <div className="linkContain">
        <ul>
          {listLink.map(link => {
            return <li key={link.id}>
              {link.icon}
              <span>{link.feld}</span>
            </li>
          })}
          <button>See More</button>
        </ul>
        <div className="hr" />
        <div className="friend-list">
          <div className="friend">
            <img src={friend} alt="" />
            <p>Wazib hasan</p>
          </div>
          <div className="friend">
            <img src={friend} alt="" />
            <p>Wazib hasan</p>
          </div>
          <div className="friend">
            <img src={friend} alt="" />
            <p>Wazib hasan</p>
          </div>
          <div className="friend">
            <img src={friend} alt="" />
            <p>Wazib hasan</p>
          </div>
          <div className="friend">
            <img src={friend} alt="" />
            <p>Wazib hasan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
