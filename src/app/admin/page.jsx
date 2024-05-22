import "./admin.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";


const Admin = () => {
  return (
    <div className="Admin">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" amount={10} />
          <Widget type="order" amount={7} />
          <Widget type="earning" amount={5} />
          <Widget type="balance" amount={2} />
          
        </div>
        <div className="charts">
          <Chart />
          
        </div>
      </div>



    </div>

  )
}

export default Admin
