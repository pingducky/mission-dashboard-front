import "../../app/styles/global.scss";
import DisplayProfilName from "../../components/sidebar/profilName/displayProfilName";

const PlanningPage: React.FC = () => {
    return (
        <div>
            <h1>Planning page</h1>
            <DisplayProfilName firstname="Hugo" name="Pigeon"/>
        </div>
    );
  };
  
export default PlanningPage;