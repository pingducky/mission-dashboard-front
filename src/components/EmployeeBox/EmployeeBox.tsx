import clsx from "clsx";
import { User } from "../../hooks/useUserData";
import { capitalize } from "../../utils/string";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import IconButton from "../layout/IconButton/IconButton";
import Popper from '@mui/material/Popper';
import { useState } from "react";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { useArchiveEmployee } from "../../hooks/useArchiveEmployee";
import { useReactivateEmployee  } from "../../hooks/useReactivateEmployee";
import styles from "./EmployeeBox.module.scss";

interface EmployeeBoxProps {
    employee: User;
    refetchEmployees: () => void;
}

function EmployeeBox({ employee, refetchEmployees }: EmployeeBoxProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { mutate: archiveEmployee } = useArchiveEmployee();
    const { mutate: reactivateEmployee } = useReactivateEmployee();
    
    const handleArchive = () => {
        archiveEmployee(employee.id, {
            onSuccess: () => {
                refetchEmployees();
            },
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    alert("Erreur : " + error.message);
                } else {
                    alert("Erreur inconnue lors de l'archivage");
                }
            }
        });
    };
    
    const handleReactivate = () => {
        reactivateEmployee(employee.id, {
            onSuccess: () => {
                refetchEmployees();
            },
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    alert("Erreur : " + error.message);
                } else {
                    alert("Erreur inconnue lors du réactivage");
                }
            }
        });
    };

    return (
        <div className={styles.employeeBox}>
            <span 
                className={clsx(
                    styles.employeeLetters,
                    {
                        [styles.online]: employee.isOnline
                    }
                ) }
            >
                {capitalize((employee?.firstName?.[0] ?? "") + (employee?.lastName?.[0] ?? ""))}
            </span>
            <div className={styles.ellipsise}>
                <IconButton
                    startIcon={<MoreHorizOutlinedIcon/>}
                    text=""
                    variant={"ghost"}
                    isRounded={false}
                    isDisabled={false}
                    onClick={(e) => {
                        e?.stopPropagation();
                        setAnchorEl(anchorEl ? null : e?.target as HTMLElement);
                    }}
                />
                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    className={styles.popup}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <ul>
                        <li>
                            <IconButton
                                startIcon={<ModeEditOutlinedIcon/>}
                                text="Modifier"
                                variant={"ghost"}
                                isRounded={false}
                                isDisabled={false}
                                color="black"
                                fontWeight="medium"
                            >
                            </IconButton>
                        </li>
                        <li>
                            <IconButton
                                startIcon={<ArchiveOutlinedIcon/>}
                                text={employee.archivedAt ? "Réactiver" : "Archiver"}
                                variant={"ghost"}
                                isRounded={false}
                                isDisabled={false}
                                color={employee.archivedAt ? "blue" : "red"}
                                fontWeight="medium"
                                onClick={employee.archivedAt ? handleReactivate : handleArchive}
                            >
                            </IconButton>
                        </li>
                    </ul>
                </Popper>
            </div>
            <h3>{employee.firstName} {employee.lastName}</h3>
            <p>Agent Polyvalent</p>
            <div className={styles.employeeInfos}>
                <div className={styles.flexContainer}>
                    <div>
                        <h4>Infos</h4>
                        <p>XXXXX</p>
                    </div>
                    <div>
                        <h4>Date d'embauche</h4>
                        <p>{employee.hiringDate && new Date(employee.hiringDate.toString()).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className={styles.iconInfo}>
                    <EmailOutlinedIcon/> 
                    <p>{employee.email}</p>
                </div>
                <div className={styles.iconInfo}>
                    <LocalPhoneOutlinedIcon/>
                    <p>{employee.phoneNumber}</p>
                </div>
            </div>
        </div>
    );
}

export default EmployeeBox;