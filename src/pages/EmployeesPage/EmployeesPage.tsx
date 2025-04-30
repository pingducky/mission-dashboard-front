import EmployeeBox from "../../components/EmployeeBox/EmployeeBox";
import { User } from "../../hooks/useUserData";
import FilterEmployees from "./FilterEmployees/FilterEmployees";
import { EmployeeFilter } from "../../hooks/useGetAllEmployees";
import Styles from "./EmployeesPage.module.scss";

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
    /**
     * Fonction pour mettre à jour l'id de l'employé
     */
    setEmployeeId: (id: number) => void,
}

const EmployeesPage: React.FC<EmployeesPageProps> = ({
        handleNavigation,
        employees,
        setEmployeesFilter,
        setEmployeeId,
    }) => {
    const employeeBoxes = employees?.map((employee) => {
        return (
            <li
                key={employee.id}
                className={Styles.employe_container}
                onClick={() => {
                    setEmployeeId(employee.id);
                    handleNavigation("salarieDetail", employee.firstName, employee.id.toString());
                }}
            >
                <EmployeeBox employee={employee} />
            </li>
        );
    });

    return (
        <>
            <FilterEmployees setFilter={setEmployeesFilter} />
            <ul className={Styles.listEmployeeContainer}>
                {employeeBoxes}
            </ul>
            <button className={Styles.addButton} onClick={() => handleNavigation('salarieCreation', 'salarieCreation')}>+</button>
        </>
    );
};

export default EmployeesPage;
