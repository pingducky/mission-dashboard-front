import React, { useState } from 'react';
import { EventInput } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import frLocale from '@fullcalendar/core/locales/fr';
import styles from './PlanningPage.module.scss'

interface MissionEvent extends EventInput {
  title: string;
  start: string;
  end: string;
}

const PlanningPage: React.FC = () => {
  const [events, setEvents] = useState<MissionEvent[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [newEvent, setNewEvent] = useState<MissionEvent>({
    title: '',
    start: '',
    end: '',
  });
  const [dateRange, setDateRange] = useState<string>('');

  const handleDateChange = (field: keyof MissionEvent, value: string) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDateRange = (startStr: Date, endStr: Date) => {
    const locale = 'fr-FR';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const start = new Date(startStr);
  
    const end = new Date(endStr);
    end.setDate(end.getDate() - 1);
  
    return `${start.toLocaleDateString(locale, options)} – ${end.toLocaleDateString(locale, options)} ${end.getFullYear()}`;
  };
  
  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent }]);
    setNewEvent({ title: '', start: '', end: '' });
    setOpenDialog(false);
  };

  return (
    <div>
      <div className={styles.detachedHeader}>
          <div>

          </div>
        <p>{dateRange}</p>
          <div>
          
          </div>
      </div>

      <Box className={styles.calendarContainer}>
        <FullCalendar
          headerToolbar={{
            left: '',
          }}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          editable={true}
          selectable={true}
          nowIndicator={true}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          height="auto"
          locale={frLocale}
          datesSet={(arg) => {
            setDateRange(formatDateRange(arg.start, arg.end));
          }}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Ajouter une mission</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Titre"
            fullWidth
            value={newEvent.title}
            onChange={e => handleDateChange('title', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Début"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.start}
            onChange={e => handleDateChange('start', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Fin"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.end}
            onChange={e => handleDateChange('end', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Adresse"
            fullWidth
            value={newEvent.adresse}
            onChange={e => handleDateChange('adresse', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Catégorie"
            fullWidth
            value={newEvent.categorie}
            onChange={e => handleDateChange('categorie', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newEvent.description}
            onChange={e => handleDateChange('description', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleAddEvent} variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PlanningPage;
