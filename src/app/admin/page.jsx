import "./admin.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";



const Admin = () => {
  return (
    <div className="Admin">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
      </div>
      </div>
  )
}

export default Admin



