
import IconButton from '../../components/layout/IconButton/IconButton';
import { User } from '../../hooks/useUserData';
import { capitalize } from '../../utils/string';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Styles from './EmployeePage.module.scss'

interface EmployeePageProps {
    /**
     * Employé
     */
    employee: User;
    /**
     * Liste des fichiers de l'employé
     */
    files: File[];
    /**
     * Indique si la requête de récupération de l'employé est en cours
     */
    isEmployeeLoading: boolean;
}

export const EmployeePage: React.FC<EmployeePageProps> = ({
        employee,
        files,
        isEmployeeLoading,
    }) => {

    const filesList = files.map((file) => {
        return <li>{file.name}</li>;
    })
    while(isEmployeeLoading) {
        return (
            <>
                <h1>Loading ...</h1>
            </>
        )
    }
    return (
        <div className={Styles.gridContainer}>
            <div className={Styles.employeeInfo}>
                <div className={Styles.employeeBlock}>
                    <span 
                    className={Styles.employeeLetters}
                    >
                        {capitalize(employee.firstName[0] + employee.lastName[0])}
                    </span>
                    <h3>{employee.firstName + " " + employee.lastName}</h3>
                    <span className={Styles.grayText}>Agent pol</span>
                    <div>
                        <p>
                            1 <br/>
                            <span className={Styles.grayText}>retard</span>
                        </p>
                        <p>
                            2 <br/>
                            <span className={Styles.grayText}>absences</span>
                        </p>
                    </div>
                    <div>
                        <IconButton
                            text={'Appeler'}
                            variant={'filled'}
                            isRounded={false}
                            startIcon={<LocalPhoneOutlinedIcon/>}
                            color={'lightGray'}
                            onClick={() => {
                                window.location.href='tel:'+employee.phoneNumber.toString()
                            }}
                        />
                        <IconButton
                            text={'Envoyer mail'}
                            variant={'filled'}
                            isRounded={false}
                            startIcon={<EmailOutlinedIcon/>}
                            color={'lightGray'}
                            onClick={() => {
                                window.location.href='mail:'+employee.email.toString()
                            }}
                        />
                    </div>

                </div>
                <div className={Styles.employeeInfoBlock}>
                    <ul>
                        <li>
                            <p><span className={Styles.grayText}>Mail</span><br /> {employee.email}</p>
                        </li>
                        <li>
                            <p><span className={Styles.grayText}>Numéro de téléphone</span><br /> {employee.phoneNumber}</p>
                        </li>
                        <li>
                            <p><span className={Styles.grayText}>Adresse postal</span><br /></p>
                        </li>
                        <li>
                            <p><span className={Styles.grayText}>Ville</span><br /></p>
                        </li>
                        <li>
                            <p><span className={Styles.grayText}>Code postal</span><br /></p>
                        </li>
                        <li>
                            <p><span className={Styles.grayText}>Status salarié</span><br /></p>
                        </li>
                        <li>
                            <p><span className={Styles.grayText}>Date d'embauche</span><br /></p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={Styles.filesContainer}>
            <h3>Fichiers / Documents</h3>
                <ul>
                    {filesList}
                </ul>
            </div>
            <div className={Styles.component}>

            </div>
        </div>
    );
}