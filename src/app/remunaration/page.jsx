import "./remunaration.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FormRemunaration from "../../app/formremunaration/Formrem"


const Remunaration = () => {
  return (
    <div className="Remunaration">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        
        <div>
          <FormRemunaration />
        </div>

      </div>



    </div>

  )
}

export default Remunaration;
