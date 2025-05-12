import React, { useState, useRef, useEffect } from 'react';
import { EventInput } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from '@mui/material';
import frLocale from '@fullcalendar/core/locales/fr';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '../../components/layout/IconButton/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiIconButton from '@mui/material/IconButton';
import MissionType from './MissionType/MissionType';
import { getUserDataFromToken } from '../../utils/auth';
import { useGetMissionTypes } from '../../hooks/useGetMissionTypes';
import { useGetMissionsByAccount } from '../../hooks/useGetMissionsByAccount';
import AddMissionDrawer from '../../components/AddMissionDrawer/AddMissionDrawer';
import { enqueueSnackbar } from '../../utils/snackbarUtils';
import { CreateMissionPayload, useCreateMission } from '../../hooks/useCreateMission';
import { useQueryClient } from '@tanstack/react-query';
import { useListEmployee } from '../../hooks/useGetAllEmployees';
import styles from './PlanningPage.module.scss';

interface MissionEvent extends EventInput {
    /**
     * Titre de la mission ou de l'événement
     */
    title: string;
    /**
     * Date et heure de début de la mission (format ISO 8601)
     */
    start: string;
    /**
     * Date et heure de fin de la mission (format ISO 8601)
     */
    end: string;
    /**
     * Adresse où se déroule la mission (optionnelle)
     */
    adresse?: string;
    /**
     * Catégorie ou type de la mission (optionnelle, ex : "urgence", "formation")
     */
    categorie?: string;
    /**
     * Description détaillée de la mission (optionnelle)
     */
    description?: string;
  }
  

const PlanningPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'timeGridDay' | 'timeGridWeek'>('timeGridWeek');
  const [dateRange, setDateRange] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [calendarStartDate, setCalendarStartDate] = useState<string | null>(null);
  const [calendarEndDate, setCalendarEndDate] = useState<string | null>(null);
  const [events, setEvents] = useState<MissionEvent[]>([]);

  const { data: employeeData } = useListEmployee('all');

  const [newEvent, setNewEvent] = useState<MissionEvent>({
    title: '',
    start: '',
    end: '',
  });

  const calendarRef = useRef<FullCalendar | null>(null);
  
  const tokenData = getUserDataFromToken();
  const today = new Date();

  const { data: missionTypes, isLoading: areMissionTypesLoading } = useGetMissionTypes();
  
  const getWeekRange = (date: Date) => {
    const day = date.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return {
      monday: monday.toISOString(),
      sunday: sunday.toISOString(),
    };
  };

  const defaultFrom = viewMode === 'timeGridDay'
    ? today.toISOString()
    : getWeekRange(today).monday;
  
  const defaultTo = viewMode === 'timeGridDay'
    ? new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
    : getWeekRange(today).sunday;

  const missionQueryParams = {
    accountId: selectedEmployee || tokenData!.id,
    from: calendarStartDate ?? defaultFrom,
    to: calendarEndDate ?? defaultTo,
  };
  
  const { data: missions } = useGetMissionsByAccount(missionQueryParams);
  
  const createMissionMutation = useCreateMission();
  const queryClient = useQueryClient();

  const handleCreateMission = async (payload: CreateMissionPayload) => {
    try {
      await createMissionMutation.mutateAsync(payload);
      enqueueSnackbar('Mission créée avec succès', 'success');
      queryClient.invalidateQueries({
        queryKey: ['missions', missionQueryParams],
      });
      setOpenDialog(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, 'error');
      } else {
        enqueueSnackbar('Erreur lors de la création de la mission', 'error');
      }
    }
  };

  const toParisISOString = (utcDateString : string | undefined) => {
    if (!utcDateString) return '';
    const date = new Date(utcDateString);
    return date.toLocaleString('sv-SE', { timeZone: 'Europe/Paris' }).replace(' ', 'T');
  };

  useEffect(() => {
    if (missions) {
      const transformedEvents: MissionEvent[] = missions.map((mission) => ({
        id: mission.id.toString(),
        title: mission.missionType?.longLibel || 'Mission',
        start: toParisISOString(mission.timeBegin),
        end: toParisISOString(mission.estimatedEnd),
        adresse: mission.address,
        categorie: mission.missionType?.shortLibel,
        description: mission.description,
        backgroundColor: mission.missionType?.color,
        borderColor: mission.missionType?.color,
      }));
      setEvents(transformedEvents);
    }
  }, [missions]);

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

  const handleEmployeeChange = (event: SelectChangeEvent) => {
    setSelectedEmployee(event.target.value);
  };

  const formatDateRange = (startStr: Date, endStr: Date) => {
    const locale = 'fr-FR';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const start = new Date(startStr);
    const end = new Date(endStr);
    end.setDate(end.getDate() - 1);
    return `${start.toLocaleDateString(locale, options)} – ${end.toLocaleDateString(locale, options)} ${end.getFullYear()}`;
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

  const formatDateForInput = (dateStr: string) => {
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  };
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
      {
        !areMissionTypesLoading && missionTypes?.length && (
          <div className={styles.missionsType}>
            <p>Types de misssions :</p>
  
            <div className={styles.missionsTypeList}>
              {
                missionTypes?.map((type) => (
                  <MissionType
                    nom={type.longLibel}
                    code={type.shortLibel}
                    color={type.color}
                  />
                ))
              }
            </div>
          </div>
        )
      }
  
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
              !areMissionTypesLoading && tokenData?.isAdmin && (
                <>
                  <FormControl className={styles.employeeForm} size="small">
                    <InputLabel id="employee-select-label">Choix des employé(e)s</InputLabel>
                    <Select
                      labelId="employee-select-label"
                      id="employee-select"
                      value={selectedEmployee}
                      onChange={handleEmployeeChange}
                      label="Choix des employé(e)s"
                    >
                      {
                        employeeData?.map((employee) => (
                          <MenuItem value={employee.id}>{employee.firstName}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
  
                  <IconButton
                    text="Créer une mission"
                    variant="filled"
                    isRounded={false}
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                  />
                </>
              )
            }
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
          eventContent={(eventInfo) => (
            <div className={styles.missionEvent}>
              <b>{eventInfo.timeText}</b>
              <i>{eventInfo.event.title}</i><br />
              <span>{eventInfo.event.extendedProps.description}</span><br />
              <span>{eventInfo.event.extendedProps.adresse}</span>
            </div>
          )}
        />
      </div>
  
      <AddMissionDrawer
        employees={employeeData?.map((employee) => ({
          id: employee.id,
          fullName: employee.firstName
        }))}
        isOpen={openDialog}
        startDate={newEvent.start}
        endDate={newEvent.end}
        missionTypes={missionTypes}
        onClose={() => setOpenDialog(false)}
        onCreate={handleCreateMission}
      />
    </div>
  );
};

export default PlanningPage;