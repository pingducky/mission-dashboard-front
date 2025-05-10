import { useState } from "react";
import IconButton from "../layout/IconButton/IconButton";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Popper from '@mui/material/Popper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import style from "./ActionButtons.module.scss";
import clsx from "clsx";


export const ActionButtons = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (anchorEl && !anchorEl.contains(event.target as Node)) {
            setAnchorEl(null);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return (
        <>
            <IconButton
                startIcon={<MoreHorizOutlinedIcon/>}
                color='lightGray'
                text=""
                variant={"filled"}
                isRounded={false}
                isDisabled={false}
                onClick={(e) => {
                    e?.stopPropagation();
                    setAnchorEl(anchorEl ? null : e?.target as HTMLElement);
                }}
                specialClass={clsx(style.actionButton, {
                    [style.open]: Boolean(anchorEl),
                })}
            />
            <Popper
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                className={style.popup}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <ul>
                    <li>
                        <IconButton
                            startIcon={<EditOutlinedIcon/>}
                            color='white'
                            text=''
                            variant={"filled"}
                            isRounded={false}
                            isDisabled={false}
                            onClick={(e) => {
                                e?.stopPropagation();
                                setAnchorEl(anchorEl ? null : e?.target as HTMLElement);
                            }}
                        />
                    </li>
                    <li>
                        <IconButton
                            startIcon={<DeleteForeverOutlinedIcon/>}
                            color='white'
                            text=''
                            variant={"filled"}
                            isRounded={false}
                            isDisabled={false}
                            onClick={(e) => {
                                e?.stopPropagation();
                                setAnchorEl(anchorEl ? null : e?.target as HTMLElement);
                            }}
                        />
                    </li>
                    <li>
                        <IconButton
                            startIcon={<InfoOutlinedIcon/>}
                            color='white'
                            text=''
                            variant={"filled"}
                            isRounded={false}
                            isDisabled={false}
                            onClick={(e) => {
                                e?.stopPropagation();
                                setAnchorEl(anchorEl ? null : e?.target as HTMLElement);
                            }}
                        />
                    </li>
                </ul>
            </Popper>
        </>
    )
}