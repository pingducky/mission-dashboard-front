import { useState } from "react";
import EmployeeBox from "../../components/EmployeeBox/EmployeeBox";
import FilterEmployees from "./FilterEmployees/FilterEmployees";
import { EmployeeFilter, useListEmployee } from "../../hooks/useGetAllEmployees";
import styles from "./EmployeesPage.module.scss";

interface EmployeesPageProps {
    /**
     * Fonction de navigation
     */
    handleNavigation: (page: string, label: string, id?: string) => void;
    /**
     * Fonction pour mettre à jour l'id de l'employé
     */
    setEmployeeId: (id: number) => void,
}

const EmployeesPage: React.FC<EmployeesPageProps> = ({
        handleNavigation,
        setEmployeeId,
    }) => {
    const [employeesFilter, setEmployeesFilter] = useState<EmployeeFilter>("all");
    const { data: employeeData, refetch: refetchEmployees } = useListEmployee(employeesFilter);
    const employeeBoxes = employeeData?.map((employee) => {
        return (
            <li
                key={employee.id}
                className={styles.employe_container}
                onClick={() => {
                    setEmployeeId(employee.id);
                    handleNavigation("salarieDetail", employee.firstName, employee.id.toString());
                }}
            >
                <EmployeeBox employee={employee} refetchEmployees={refetchEmployees} />
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


