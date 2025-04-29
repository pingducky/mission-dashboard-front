
import IconButton from '../../components/layout/IconButton/IconButton';
import { User } from '../../hooks/useUserData';
import { capitalize } from '../../utils/string';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { File } from '../../hooks/useGetUserFiles';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Loading } from '../../components/loading/Loading';
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
    /**
     * Indique si la requête de récupération des fichiers est en cours
     */
    areFilesLoading: boolean;
}

export const EmployeePage: React.FC<EmployeePageProps> = ({
    employee,
    files,
    isEmployeeLoading,
    areFilesLoading,
}) => {
    const handleFiles = (files: File[]) => {
        if(files.length <= 0) {
            return (
                <li>
                    <h4>Aucun fichier</h4>
                </li>
            )
        }

        return files.map((file) => {
            return (
                <li key={file.id}>
                    <div>
                        <InsertDriveFileOutlinedIcon/>
                        <p>{file.name}</p>
                    </div>
                    <IconButton
                        startIcon={<DeleteForeverOutlinedIcon/>}
                        text={file.size}
                        isRounded={false}
                        variant={'ghost'}
                        color={'lightGray'}
                        specialClass={Styles.deleteFileButton}
                        onClick={() => {
                            console.log("delete file "+file.id)
                        }}
                    />
                </li>
            );
        })
    }

    return (
            !isEmployeeLoading ? (
                <div className={Styles.gridContainer}>
                    <div className={Styles.employeeInfo}>
                        <div className={Styles.employeeBlock}>
                            <span className={Styles.employeeLetters}>
                                {capitalize(employee.firstName[0] + employee.lastName[0])}
                            </span>
                            <h3>{employee.firstName + " " + employee.lastName}</h3>
                            <span className={Styles.grayText}>Agent pol</span>
                            <div className={Styles.statsContainer}>
                                <p>
                                    {employee.delay} <br/>
                                    <span className={Styles.grayText}>retard</span>
                                </p>
                                <p>
                                    {employee.absence} <br/>
                                    <span className={Styles.grayText}>absences</span>
                                </p>
                            </div>
                            <div className={Styles.actionsContainer}>
                                <IconButton
                                    text={'Appeler'}
                                    variant={'filled'}
                                    isRounded={false}
                                    startIcon={<LocalPhoneOutlinedIcon />}
                                    color={'lightGray'}
                                    fontWeight={'medium'}
                                    onClick={() => {
                                        window.location.href = 'tel:' + employee.phoneNumber.toString();
                                    }}
                                />
                                <IconButton
                                    text={'Envoyer mail'}
                                    variant={'filled'}
                                    isRounded={false}
                                    startIcon={<EmailOutlinedIcon />}
                                    color={'lightGray'}
                                    fontWeight={'medium'}
                                    onClick={() => {
                                        window.location.href = 'mailto:' + employee.email.toString();
                                    }}
                                />
                            </div>
                        </div>
                        <div className={Styles.employeeInfoBlock}>
                            <ul>
                                <li>
                                    <p><span className={Styles.grayText}>Mail</span> {employee.email}</p>
                                </li>
                                <li>
                                    <p><span className={Styles.grayText}>Numéro de téléphone</span> {employee.phoneNumber}</p>
                                </li>
                                <li>
                                    <p><span className={Styles.grayText}>Adresse postal</span> {employee.address}</p>
                                </li>
                                <li>
                                    <p><span className={Styles.grayText}>Ville</span> {employee.city}</p>
                                </li>
                                <li>
                                    <p><span className={Styles.grayText}>Code postal</span> {employee.postalCode}</p>
                                </li>
                                <li>
                                    <p><span className={Styles.grayText}>Status salarié</span></p>
                                </li>
                                <li>
                                    <p>
                                        <span className={Styles.grayText}>Date d'embauche</span>
                                        {employee.hiringDate ? new Date(employee.hiringDate.toString()).toLocaleDateString() : ""}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={Styles.filesContainer}>
                        <h3>Fichiers / Documents</h3>
                        <ul className={Styles.filesList}>
                            { areFilesLoading ? <Loading/> : handleFiles(files)}
                        </ul>
                    </div>
                    <div className={Styles.component}></div>
                </div>
            ) : (
                <Loading />
            )
    );
}