
import IconButton from '../../components/layout/IconButton/IconButton';
import { Role, User } from '../../hooks/useUserData';
import { capitalize } from '../../utils/string';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { File } from '../../hooks/useGetUserFiles';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Loading } from '../../components/loading/Loading';
import MissionsWrapper from "../../components/missions/MissionsListSwitch/MissionsListSwitch";
import WifiIcon from '@mui/icons-material/Wifi';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGetLatestWorkSession } from '../../hooks/useGetLatestWorkSession';
import clsx from 'clsx';
import { format } from 'date-fns';
import styles from './EmployeePage.module.scss'

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
    /**
     * indique si l'utilisateur connecté est un admin
     */
    isAdmin?: boolean;
}

export const EmployeePage: React.FC<EmployeePageProps> = ({
    employee,
    files,
    isEmployeeLoading,
    areFilesLoading,
    isAdmin,
}) => {
    const { data: latestWorkSession, isLoading: latestIsloading} = useGetLatestWorkSession(employee?.id, isAdmin!);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current && !(window as any)._leafletMapInitialized && !latestIsloading && latestWorkSession) {
            const map = L.map(mapRef.current).setView([48.07580821401472, -0.7811754739238855], 11);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);
            const coordinates = latestWorkSession?.startLocation.split(',');
            if(coordinates && coordinates.length === 2) {
                L.marker([parseFloat(coordinates[0].trim()), parseFloat(coordinates[1].trim())]).addTo(map);
            }
            (window as any)._leafletMapInitialized = true;
        }
    }, [mapRef.current, employee]);

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
                    <a href={file.path} target='_blank'>
                        <InsertDriveFileOutlinedIcon/>
                        <p>{file.name}</p>
                    </a>
                    <IconButton
                        startIcon={<DeleteForeverOutlinedIcon/>}
                        text={file.size}
                        isRounded={false}
                        variant={'ghost'}
                        color={'darkGray'}
                        specialClass={styles.deleteFileButton}
                    />
                </li>
            );
        })
    }

    const handleRoles = (employee: User) => {
        return employee.roles.map((role: Role) => {
            return (
                <span key={role.id} className={styles.grayText}>{role.longLibel}</span>
            );
        })
    }

    const handleStatus = (employee: User) => {
        return "Membre " + (employee.archivedAt ? "Désactivé" : "Actif")
    }

    const handleContact = (employee: User, type: 'phone' | 'email') => {
        if (type === 'phone') {
            window.location.href = 'tel:' + employee.phoneNumber.toString();
        } else if (type === 'email') {
            window.location.href = 'mailto:' + employee.email.toString();
        }
    }

    return (
        !isEmployeeLoading ? (
            <div className={styles.gridContainer}>
                <div className={styles.employeeInfo}>
                    <div className={styles.employeeBlock}>
                        <span className={styles.employeeLetters}>
                            {capitalize(employee.firstName[0] + employee.lastName[0])}
                        </span>
                        <h3>{employee.firstName + " " + employee.lastName}</h3>
                        {handleRoles(employee)}
                        <div className={styles.statsContainer}>
                            <p>
                                {employee.delay} <br/>
                                <span className={styles.grayText}>retard</span>
                            </p>
                            <p>
                                {employee.absence} <br/>
                                <span className={styles.grayText}>absences</span>
                            </p>
                        </div>
                        <div className={styles.actionsContainer}>
                            <IconButton
                                text={'Appeler'}
                                variant={'filled'}
                                isRounded={false}
                                startIcon={<LocalPhoneOutlinedIcon />}
                                color={'lightGray'}
                                fontWeight={'medium'}
                                onClick={() => {
                                    handleContact(employee, 'phone')
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
                                    handleContact(employee, 'email')
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.employeeInfoBlock}>
                        <ul>
                            <li>
                                <p><span className={styles.grayText}>Mail</span> {employee.email}</p>
                            </li>
                            <li>
                                <p><span className={styles.grayText}>Numéro de téléphone</span> {employee.phoneNumber}</p>
                            </li>
                            <li>
                                <p><span className={styles.grayText}>Adresse postal</span> {employee.address}</p>
                            </li>
                            <li>
                                <p><span className={styles.grayText}>Ville</span> {employee.city}</p>
                            </li>
                            <li>
                                <p><span className={styles.grayText}>Code postal</span> {employee.postalCode}</p>
                            </li>
                            <li>
                                <p><span className={styles.grayText}>Status salarié</span> {handleStatus(employee)}</p>
                            </li>
                            <li>
                                <p>
                                    <span className={styles.grayText}>Date d'embauche</span>
                                    {employee.hiringDate && new Date(employee.hiringDate.toString()).toLocaleDateString()}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.filesContainer}>
                    <h3>Fichiers / Documents</h3>
                    <ul className={styles.filesList}>
                        { areFilesLoading ? <Loading/> : handleFiles(files)}
                    </ul>
                </div>
                <div className={clsx(styles.component,
                    {
                        [styles.adminMap]: isAdmin,
                    }
                )}>
                    <MissionsWrapper accountId={employee.id.toString()} />
                    <div className={styles.mapContainer}>
                        <h3>
                            Activités en direct 
                            <WifiIcon 
                                className={clsx(
                                    styles.wifiIcon,
                                    {
                                        [styles.enabled]: !!latestWorkSession,
                                    })
                                } 
                            />
                        </h3>
                        <p>{latestWorkSession ? "Mission en cours : " + latestWorkSession.description : "Aucune mission en cours"}</p>
                        <div id="map" className={styles.map} ref={mapRef}>
                            { isAdmin && latestWorkSession && (
                                <div className={styles.mapInfo}>
                                    <h4> <PushPinOutlinedIcon className={styles.icon}/> Pointage</h4>
                                    <p className={styles.timeSessionStart}>Pointé à {format(new Date(latestWorkSession.startTime), "HH:mm").toString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
            </div>
        ) : (
            <Loading />
        )
    );
}