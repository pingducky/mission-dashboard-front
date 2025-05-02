import React, { useState, useRef } from 'react';
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
import styles from './PlanningPage.module.scss';
import MissionType from './MissionType/MissionType';
import { getUserDataFromToken } from '../../utils/auth';
import { useGetMissionTypes } from '../../hooks/useGetMissionTypes';
import { useGetMissionsByAccount } from '../../hooks/useGetMissionsByAccount';
import AddMissionDrawer from '../../components/AddMissionDrawer/AddMissionDrawer';

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
  const [events, setEvents] = useState<MissionEvent[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'timeGridDay' | 'timeGridWeek'>('timeGridWeek');
  const [dateRange, setDateRange] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  const tokenData = getUserDataFromToken();

  const { data: missionTypes, isLoading: areMissionTypesLoading } = useGetMissionTypes();

//   const { data: missions, isLoading, error } = useGetMissionsByAccount({
//     accountId: tokenData!.id,
//     from: "2020-05-01",
//     to: "2030-05-10",
//   });

//   console.debug("missions : ", missions);

  const calendarRef = useRef<FullCalendar | null>(null);

  const [newEvent, setNewEvent] = useState<MissionEvent>({
    title: '',
    start: '',
    end: '',
  });

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
    setNewEvent({
      title: '',
      start: formatDateForInput(selectInfo.startStr),
      end: formatDateForInput(selectInfo.endStr),
    });
    setOpenDialog(true);
  };
  
  return (
    <div>
        { !areMissionTypesLoading && (<div className={styles.missionsType}>
            <p>Types de misssions :</p>

            <div className={styles.missionsTypeList}>
                {
                    missionTypes?.map((type) => (
                        <MissionType nom={type.longLibel} code={type.shortLibel} color={type.color}/>
                    ))
                }
            </div>
        </div>)
        }
      <div className={styles.detachedHeader}>
        <div>
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

        <div className={styles.rightSection}>
            <FormControl size="small" style={{ minWidth: 180, marginRight: '1rem' }}>
                <InputLabel id="employee-select-label">Choix des employé(e)s</InputLabel>
                <Select
                labelId="employee-select-label"
                id="employee-select"
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                label="Choix des employé(e)s"
                >
                <MenuItem value="">
                    <em>Aucun</em>
                </MenuItem>
                <MenuItem value="alice">Alice</MenuItem>
                <MenuItem value="bob">Bob</MenuItem>
                <MenuItem value="charlie">Charlie</MenuItem>
                </Select>
            </FormControl>

            <IconButton
                text="Créer une mission"
                variant="filled"
                isRounded={false}
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
            />
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
        initialView="timeGridWeek"
        events={events}
        editable={true}
        selectable={true}
        select={handleDateSelect}
        nowIndicator={true}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        height="auto"
        locale={frLocale}
        datesSet={(arg) => {
            setDateRange(formatDateRange(arg.start, arg.end));
        }}
        />
      </div>

        <AddMissionDrawer
            employees={[]} 
            isOpen={openDialog}
            startDate={newEvent.start}
            endDate={newEvent.end}
            missionTypes={missionTypes}
            onClose={() => setOpenDialog(false)}

        />
    </div>
  );
};

export default PlanningPage;