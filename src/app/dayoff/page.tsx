import "./dayoff.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Conge from "../congeoff/page"

const Employee = () => {
  return (
    <div className="Dayoff">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        <Conge />
      </div>



    </div>

  )
}

export default Employee