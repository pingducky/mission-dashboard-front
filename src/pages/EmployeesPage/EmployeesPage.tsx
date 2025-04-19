import EmployeeBox from "../../components/EmployeeBox/EmployeeBox";
import { User } from "../../hooks/useUserData";
import Styles from "./EmployeesPage.module.scss";
import FilterEmployees from "./FilterEmployees/FilterEmployees";

interface EmployeesPageProps {
    /**
     * Fonction de navigation
     */
    handleNavigation: (page: string, label: string, id: string) => void;
    /**
     * Liste des employés
     */
    employees: User[];
    /**
     * Fonction pour mettre à jour le filtre des employés
     */
    setEmployeesFilter: (filter: 'all' | 'active' | 'inactive' | 'online') => void;
}

const EmployeesPage: React.FC<EmployeesPageProps> = ({
        handleNavigation,
        employees,
        setEmployeesFilter
    }) => {
    const employeeBoxes = employees?.map((employee) => {
        return(
            <li 
                key={employee.id}
                className={Styles.employe_container}
                onClick={() => handleNavigation("salarieDetail", employee.firstName, employee.id.toString())}
            >
                <EmployeeBox employee={employee} />
            </li>
        )
    });
    return (
        <>
            <FilterEmployees setFilter={setEmployeesFilter}/>
            <ul className={Styles.list_employee_container}>
                {employeeBoxes}
            </ul>
        </>
    );
}

export default EmployeesPage;