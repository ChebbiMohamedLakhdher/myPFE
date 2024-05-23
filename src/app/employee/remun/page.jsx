import "./remun.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../empComponent/Sidebar/page";
import Remun from "../../remuntable/page";

const Remuns = () => {
  return (
    <div className="Remun">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        <Remun />
      </div>
    </div>
  );
};

export default Remuns;
