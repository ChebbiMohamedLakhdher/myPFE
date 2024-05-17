import "./main.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../empComponent/Sidebar/page";
import Widget from "../../../components/widget/Widget";
import Chart from "../../../components/chart/Chart";


const Employee = () => {
  return (
    <div className="Employee">
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

export default Employee