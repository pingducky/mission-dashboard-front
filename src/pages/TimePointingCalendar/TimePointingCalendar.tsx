import FullCalendar from "@fullcalendar/react";
import { useEffect, useRef, useState } from "react";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiIconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '../../components/layout/IconButton/IconButton';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { getUserDataFromToken } from "../../utils/auth";
import { useListEmployee } from "../../hooks/useGetAllEmployees";
import { formatDateForInput, getWeekRange, toParisISOString, toParisISOStringV2 } from "../../utils/dates";
import { useGetWorkSessionsByAccount } from "../../hooks/useGetWorkSessionsByAccount";
import { formatInTimeZone } from 'date-fns-tz';
import { EventInput } from "@fullcalendar/core/index.js";
import AddSessionDrawer from "../../components/AddSessionDrawer/AddSessionDrawer";
import { enqueueSnackbar } from "../../utils/snackbarUtils";
import styles from "./TimePointingCalendar.module.scss";

interface WorkSessionEvent extends EventInput {
    /**
     * Titre de la session de travail
     */
    title: string;
    /**
     * Date et heure de début de session (format ISO 8601)
     */
    start: string;
    /**
     * Date et heure de fin de session (format ISO 8601)
     */
    end: string;
    /**
     * Description
     */
    description?: string;
}

const TimePointingCalendar: React.FC = () => {
    const [viewMode, setViewMode] = useState<'timeGridDay' | 'timeGridWeek'>('timeGridWeek');
    const [dateRange, setDateRange] = useState<string>('');
    const [calendarStartDate, setCalendarStartDate] = useState<string | null>(null);
    const [calendarEndDate, setCalendarEndDate] = useState<string | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<string>('');
    const [events, setEvents] = useState<WorkSessionEvent[]>([]);
    const [newEvent, setNewEvent] = useState<WorkSessionEvent>({
        title: '',
        start: '',
        end: '',
        description: '',
    });
    const calendarRef = useRef<FullCalendar | null>(null);
    const tokenData = getUserDataFromToken();
    const today = new Date();
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { data: employeeData } = useListEmployee('all');

    const defaultFrom = viewMode === 'timeGridDay'
        ? today.toISOString()
        : getWeekRange(today).monday;

    const defaultTo = viewMode === 'timeGridDay'
        ? new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
        : getWeekRange(today).sunday;

    const workSessionQueryParams = {
        accountId: selectedEmployee || tokenData!.id,
        from: calendarStartDate ?? defaultFrom,
        to: calendarEndDate ?? defaultTo,
    };
    console.log("workSessionQueryParams : ", workSessionQueryParams)

    const { data: workSessions } = useGetWorkSessionsByAccount(workSessionQueryParams);
    const handlePrev = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.prev();
        }
    };

    const handleNext = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.next();
        }
    };

    const handleViewChange = (
        event: React.MouseEvent<HTMLElement>,
        newView: 'timeGridDay' | 'timeGridWeek' | null
    ) => {
        if (newView) {
            setViewMode(newView);
            const calendarApi = calendarRef.current?.getApi();
            if (calendarApi) {
                calendarApi.changeView(newView);
                calendarApi.today();
            }
        }
    };

    const formatDateRange = (startStr: Date, endStr: Date) => {
        const locale = 'fr-FR';
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        const start = new Date(startStr);
        const end = new Date(endStr);
        end.setDate(end.getDate() - 1);
        return `${start.toLocaleDateString(locale, options)} – ${end.toLocaleDateString(locale, options)} ${end.getFullYear()}`;
    };

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            setViewMode(isMobile ? 'timeGridDay' : 'timeGridWeek');
            const calendarApi = calendarRef.current?.getApi();
            if (calendarApi) {
                calendarApi.changeView(isMobile ? 'timeGridDay' : 'timeGridWeek');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const date = new Date();
        const parisDateNow = formatInTimeZone(date, 'Europe/Paris', 'yyyy-MM-dd HH:mm:ss');

        if (workSessions) {
            const transformedEvents: WorkSessionEvent[] = workSessions.map((workSession) => ({
                id: workSession.id.toString(),
                title: 'Session de travail',
                start: toParisISOString(workSession.startTime),
                end: workSession.endTime ? toParisISOString(workSession.endTime) : toParisISOStringV2(parisDateNow),
                isOngoing: !workSession.endTime
            }));
            setEvents(transformedEvents);
        }
    }, [workSessions]);

    const handleDateSelect = (selectInfo: { startStr: string; endStr: string }) => {
        const selectedStart = new Date(selectInfo.startStr);
        const selectedEnd = new Date(selectInfo.endStr);

        const isConflict = events.some(event => {
            const eventStart = new Date(event.start as string);
            const eventEnd = new Date(event.end as string);

            return (
                (selectedStart < eventEnd && selectedEnd > eventStart)
            );
        });

        if (isConflict) {
            enqueueSnackbar('Une mission existe déjà dans cette plage horaire.', 'error')
            return;
        }

        setNewEvent({
            title: '',
            start: formatDateForInput(selectInfo.startStr),
            end: formatDateForInput(selectInfo.endStr),
        });
        setOpenDialog(true);
    };


    return (
        <div>
            <div className={styles.detachedHeader}>
                <div className={styles.leftSection}>
                    <MuiIconButton size="small" onClick={handlePrev}>
                        <ChevronLeftIcon />
                    </MuiIconButton>

                    <MuiIconButton size="small" onClick={handleNext}>
                        <ChevronRightIcon />
                    </MuiIconButton>

                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        size="small"
                        className={styles.toggleGroup}
                    >
                        <ToggleButton value="timeGridDay" className={styles.toggleButton}>
                            Jour
                        </ToggleButton>
                        <ToggleButton value="timeGridWeek" className={styles.toggleButton}>
                            Semaine
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <p className={styles.dateRange}>{dateRange}</p>

                <div>
                    <div className={styles.rightSection}>
                        {
                            tokenData?.isAdmin && (
                                <>
                                    <FormControl className={styles.employeeForm} size="small">
                                        <InputLabel id="employee-select-label">Choix des employé(e)s</InputLabel>
                                        <Select
                                            labelId="employee-select-label"
                                            id="employee-select"
                                            value={selectedEmployee}
                                            label="Choix des employé(e)s"
                                            onChange={(value: SelectChangeEvent) => setSelectedEmployee(value.target.value)}
                                        >
                                            {
                                                employeeData?.map((employee) => (
                                                    <MenuItem 
                                                        key={employee.id}
                                                        value={employee.id}
                                                    >{employee.firstName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </>
                            )
                        }
                        <IconButton
                            text="Enregistrer une session de travail"
                            variant="filled"
                            isRounded={false}
                            startIcon={<AddIcon />}
                            onClick={() => setOpenDialog(true)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.calendarContainer}>
                <FullCalendar
                    ref={calendarRef}
                    headerToolbar={{
                        left: '',
                        center: '',
                        right: ''
                    }}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    eventStartEditable={false}
                    eventDurationEditable={false}
                    initialView={viewMode}
                    events={events}
                    editable={true}
                    selectable={tokenData?.isAdmin || false}
                    select={handleDateSelect}
                    nowIndicator={true}
                    slotMinTime="08:00:00"
                    timeZone="Europe/Paris"
                    slotMaxTime="20:00:00"
                    height="auto"
                    locale={frLocale}
                    datesSet={(arg) => {
                        setDateRange(formatDateRange(arg.start, arg.end));
                        setCalendarStartDate(arg.start.toISOString());
                        setCalendarEndDate(arg.end.toISOString());
                    }}
                    eventContent={(eventInfo) => {
                        const isOngoing = eventInfo.event.extendedProps.isOngoing;
                        return (
                            <div className={styles.workEvent}>
                                <b>{eventInfo.timeText}</b>
                                <span>
                                    {isOngoing ? "Session de travail en cours" : "Session de travail Terminée"}
                                </span>
                            </div>
                        );
                    }}
                />
            </div>

            <AddSessionDrawer
                isOpen={openDialog}
                startDate={newEvent.start}
                endDate={newEvent.end}
                selectedAccountId={selectedEmployee}
                onClose={() => setOpenDialog(false)}
            />
        </div>
    )
}

export default TimePointingCalendar;