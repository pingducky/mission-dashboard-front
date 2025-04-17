import clsx from "clsx";
import { User } from "../../hooks/useUserData";
import { capitalize } from "../../utils/string";
import Styles from "./EmployeeBox.module.scss";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import IconButton from "../layout/IconButton/IconButton";
import Popper from '@mui/material/Popper';
import { useState } from "react";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

interface EmployeeBoxProps {
    employee: User;
}

function EmployeeBox({ employee }: EmployeeBoxProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <div className={Styles.employee_box}>
            <span 
                className={clsx(Styles.employee_letters,
                    employee.isOnline ? Styles.online : ""
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
                            >
                            </IconButton>
                        </li>
                        <li>
                            <IconButton
                                startIcon={<ArchiveOutlinedIcon/>}
                                text="Modifier"
                                variant={"ghost"}
                                isRounded={false}
                                isDisabled={false}
                                color="black"
                            >
                            </IconButton>
                        </li>
                        <li>
                            <IconButton
                                startIcon={<DeleteForeverOutlinedIcon/>}
                                text="Modifier"
                                variant={"ghost"}
                                isRounded={false}
                                isDisabled={false}
                                color="black"
                            >
                            </IconButton>
                        </li>
                    </ul>
                </Popper>
            </div>
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