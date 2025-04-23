import EmployeeBox from "../../components/EmployeeBox/EmployeeBox";
import { User } from "../../hooks/useUserData";
import FilterEmployees from "./FilterEmployees/FilterEmployees";
import { EmployeeFilter } from "../../hooks/useGetAllEmployees";
import styles from "./EmployeesPage.module.scss";

interface EmployeesPageProps {
    /**
     * Fonction de navigation
     */
    handleNavigation: (page: string, label: string, id?: string) => void;
    /**
     * Liste des employés
     */
    employees: User[];
    /**
     * Fonction pour mettre à jour le filtre des employés
     */
    setEmployeesFilter: (filter: EmployeeFilter) => void;
}

const EmployeesPage: React.FC<EmployeesPageProps> = ({
    handleNavigation,
    employees,
    setEmployeesFilter
}) => {
    const employeeBoxes = employees?.map((employee) => {
        return (
            <li 
                key={employee.id}
                className={styles.employe_container}
                onClick={() =>
                    handleNavigation(
                        "salarieDetail",
                        employee.firstName,
                        employee.id.toString()
                    )
                }
            >
                <EmployeeBox employee={employee} />
            </li>
        );
    });

    return (
        <>
            <FilterEmployees setFilter={setEmployeesFilter} />
            <ul className={styles.listEmployeeContainer}>
                {employeeBoxes}
            </ul>
            <button className={styles.addButton} onClick={() => handleNavigation('salarieCreation', 'salarieCreation')}>+</button>
        </>
    );
};

export default EmployeesPage;
