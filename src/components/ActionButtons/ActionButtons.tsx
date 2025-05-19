import React, { useState } from "react";
import IconButton from "../layout/IconButton/IconButton";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import clsx from "clsx";
import style from "./ActionButtons.module.scss";


export const ActionButtons : React.FC = () => {
    const [parent, setParent] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState<Boolean>(false);


    const handleClickOutside = (event: MouseEvent) => {
        if (open && parent && !parent.contains(event.target as Node)) {
            setParent(null);
            setOpen(false);
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
                    setParent(parent ? null : (e?.target as HTMLElement).closest('td'));
                    setOpen(!open);
                }}
                specialClass={clsx(style.actionButton, {
                    [style.open]: Boolean(parent),
                })}
            />
            <ul className={clsx(style.actionButtonList , {
                [style.open]: Boolean(open),
            })}>
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
                    />
                </li>
            </ul>
        </>
    )
}