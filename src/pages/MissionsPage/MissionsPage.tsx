import * as React from 'react';
import { Loading } from '../../components/loading/Loading';
import { useGetMissions } from '../../hooks/useGetMissions';
import { MissionModel } from '../../hooks/useGetMissionsByAccount';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { User } from '../../hooks/useUserData';
import { safeDate } from '../../utils/dates';
import TablePagination from '@mui/material/TablePagination';
import style from './MissionsPage.module.scss'
import { ActionButtons } from '../../components/ActionButtons/ActionButtons';
import FilterMissions from './FilterMissions/FilterMissions';

interface MisionsPageProps {
    /**
     * Fonction de navigation
     */
    handleNavigation: (page: string, label: string, id?: string) => void;
    /**
     * Id de l'utilisateur connecté
     */
    userId: number
}

export const MissionsPage: React.FC<MisionsPageProps> = ({
    handleNavigation,
    userId,
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [filter, setFilter] = React.useState<number>(0);
    const {data: missionsData, isLoading } = useGetMissions(filter, userId) ?? [];

    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getMissionDates = (mission: MissionModel) => {
        const datebegin = safeDate(mission.timeBegin);
        const dateEnd = safeDate(mission.estimatedEnd);

        if(datebegin?.toLocaleDateString() === dateEnd?.toLocaleDateString()) {
            return (
                <>
                    {datebegin?.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })}
                    <span className={style.grayText}>
                        {datebegin?.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
                        ~
                        {dateEnd?.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
                    </span>
                </>
            )
        }
        return (
            <>
                {datebegin?.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' })} 
                 -  
                {dateEnd?.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' })}
                <span></span>
            </>
        );
    }

    const getMissionEmployees = (mission: MissionModel) => {
        const nbrAssigned = mission.assignedUsers?.length;
        if (nbrAssigned === 1) {
            const employee = mission.assignedUsers[0];
            return (
                <>
                    {employee.firstName} {employee.lastName}
                </>
            )
        } else if(nbrAssigned > 1) {
            return (
                <>
                    En équipe
                    <ul className={style.teamList}>
                        {mission.assignedUsers.map((employee: User) => {
                            return (
                                <li key={employee.id} className={style.grayText}>
                                    {employee.firstName} {employee.lastName}
                                </li>
                            )
                        })}
                    </ul>
                </>
            )
        } else {
            return(
                <span className={style.redText}>
                    <WarningAmberIcon/>
                    Attention Pas de <br/> personnel attribué
                </span>
            );
        }
    }

    const missions = missionsData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((mission: MissionModel) => {
        return (
            <tr key={mission.id} onClick={() => handleNavigation('mission', mission.description, mission.id.toString())}>
                <th scope="row">{mission.description}</th>
                <td>{mission.address}</td>
                <td>{getMissionDates(mission)}</td>
                <td>{mission.missionType?.longLibel}</td>
                <td>{getMissionEmployees(mission)}</td>
                <td><ActionButtons/></td>
            </tr>
        )
    })

    return !isLoading && missions ? (
        <>
            <FilterMissions
                setFilter={setFilter}
            />
            <div className={style.missionsContainer}>
                <table className={style.MissionsList}>
                    <thead>
                        <tr>
                            <th scope="col">Nom de la mission</th>
                            <th scope="col">Adresse</th>
                            <th scope="col">Date et Heures</th>
                            <th scope="col">Type Mission</th>
                            <th scope="col">Attribution</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missions}
                    </tbody>
                </table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25, 50]}
                component="div"
                count={missionsData?.length ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    ) : <Loading/>;
}