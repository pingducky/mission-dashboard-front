import EmployeeBox from "../../components/EmployeeBox/EmployeeBox";
import { User } from "../../hooks/useUserData";
import Styles from "./ListEmployeePage.module.scss";

function ListEmployeePage(handleNavigation: (page: string, label: string, id: string) => void, employees: User[]) {

    console.log("employees", employees);
    const employeeBoxes = employees.map((employee) => {
        return(
            <li key={employee.id} className={Styles.employe_container} onClick={() => handleNavigation("salarieDetail", employee.firstName, employee.id.toString())}>
                <EmployeeBox employee={employee} />
            </li>
        )
    });
    return (
        <>
            <ul className={Styles.list_employee_container}>
                {employeeBoxes}
            </ul>
        </>
    );
}

export default ListEmployeePage;