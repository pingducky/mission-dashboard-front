import "../../app/styles/global.scss";
// import Sidebar from "../../components/layout/Sidebar/Sidebar.tsx";
import FilterEmployees from "../EmployeesPage/FilterEmployees/FilterEmployees.tsx";

const PlanningPage: React.FC = () => {
    return (
        <>
            <div>
                <h1>Planning page</h1>
            </div>

            <FilterEmployees />

            {/* <Sidebar/> */}
        </>
    );
};

export default PlanningPage;
