import clsx from "clsx";
import { User } from "../../hooks/useUserData";
import { capitalize } from "../../utils/string";
import Styles from "./EmployeeBox.module.scss";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

interface EmployeeBoxProps {
    employee: User;
}

function EmployeeBox({ employee }: EmployeeBoxProps) {
    return (
        <div className={Styles.employee_box}>
            <span 
                className={clsx(Styles.employee_letters,
                    employee.isOnline ? Styles.online : ""
                ) }
            >
                {capitalize(employee.firstName[0] + employee.lastName[0])}
            </span>
            <div className={Styles.ellipsise}></div>
            <h3>{employee.firstName} {employee.lastName}</h3>
            <p>Agent Polyvalent</p>
            <div className={Styles.employee_infos}>
                <div className={Styles.flex_container}>
                    <div>
                        <h4>Infos</h4>
                        <p>XXXXX</p>
                    </div>
                    <div>
                        <h4>Date d'embauche</h4>
                        <p>XXXXX</p>
                    </div>
                </div>
                <div className={Styles.icon_info}>
                    <EmailOutlinedIcon/> 
                    <p>{employee.email}</p>
                </div>
                <div className={Styles.icon_info}>
                    <LocalPhoneOutlinedIcon/>
                    <p>{employee.phoneNumber}</p>
                </div>
            </div>
        </div>
    );
}

export default EmployeeBox;