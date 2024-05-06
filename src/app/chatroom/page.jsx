import "./chatroom.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Generalchat from "../../app/generalchat/page";
import CrispWithNoSSR from "../../app/layout";


const Chatroom= () => {
  return (
    <div className="chatroom">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        <div>
        <CrispWithNoSSR />
        </div>
        
      </div>
      </div>
      
  )
}

export default Chatroom
