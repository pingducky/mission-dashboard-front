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
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useArchiveEmployee } from "../../hooks/useArchiveEmployee";

import Styles from "./EmployeeBox.module.scss";

interface EmployeeBoxProps {
    employee: User;
}

function EmployeeBox({ employee }: EmployeeBoxProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Récupérer le token depuis le sessionStorage (ou autre mécanisme de stockage)
    const token = sessionStorage.getItem('token');
    const archiveEmployeeMutation = useArchiveEmployee(token);

    const handleArchive = () => {
        if (!token) {
            console.error("Token manquant !");
            return;
        }

        // Appel de la mutation d'archivage
        archiveEmployeeMutation.mutate(employee.id, {
            onSuccess: () => {
                console.log("Employé archivé !");
                // Gérer le succès ici (par exemple, un message ou une mise à jour de l'interface)
            },
            onError: (err) => {
                console.error("Erreur lors de l'archivage de l'employé:", err);
            }
        });
    };

    return (
        <div className={Styles.employeeBox}>
            <span 
                className={clsx(
                    Styles.employeeLetters,
                    {
                        [Styles.online]: employee.isOnline
                    }
                ) }
            >
                {capitalize(employee.firstName[0] + employee.lastName[0])}
            </span>
            <div className={Styles.ellipsise}>
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
                >
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorEl}
                    className={Styles.popup}
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
                                text="Archiver"
                                variant={"ghost"}
                                isRounded={false}
                                isDisabled={false}
                                color="red"
                                fontWeight="medium"
                                onClick={handleArchive}
                            >
                            </IconButton>
                        </li>
                        {/* <li>
                            <IconButton
                                startIcon={<DeleteForeverOutlinedIcon/>}
                                text="Supprimer"
                                variant={"ghost"}
                                isRounded={false}
                                isDisabled={false}
                                color="red"
                                fontWeight="medium"
                            >
                            </IconButton>
                        </li> */}
                    </ul>
                </Popper>
            </div>
            <h3>{employee.firstName} {employee.lastName}</h3>
            <p>Agent Polyvalent</p>
            <div className={Styles.employeeInfos}>
                <div className={Styles.flexContainer}>
                    <div>
                        <h4>Infos</h4>
                        <p>XXXXX</p>
                    </div>
                    <div>
                        <h4>Date d'embauche</h4>
                        <p>XXXXX</p>
                    </div>
                </div>
                <div className={Styles.iconInfo}>
                    <EmailOutlinedIcon/> 
                    <p>{employee.email}</p>
                </div>
                <div className={Styles.iconInfo}>
                    <LocalPhoneOutlinedIcon/>
                    <p>{employee.phoneNumber}</p>
                </div>
            </div>
        </div>
    );
}

export default EmployeeBox;