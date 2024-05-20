import "./news.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../empComponent/Sidebar/page";
import Widget from "../../../components/widget/Widget";
import Chart from "../../../components/chart/Chart";
import Formation from "../../../empComponent/Formation/page";
import Reunion from "../../../empComponent/Reunion/page";
import Document from "../../../empComponent/Document/page";

const News = () => {
  return (
    <div className="News">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        <div className="empreunion">
          <div className="reunion-container">
            <Reunion />
          </div>
          <div className="formation-container">
            <Formation />
          </div>
          <div className="document-container">
            <Document />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
