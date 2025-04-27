import React, { useState } from 'react';
import { EventInput } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import frLocale from '@fullcalendar/core/locales/fr';
import AddIcon from '@mui/icons-material/Add';

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

  const handleDateChange = (field: keyof MissionEvent, value: string) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent }]);
    setNewEvent({ title: '', start: '', end: '' });
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Ajouter une mission
        </Button>
      </Box>

      <FullCalendar
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
      />

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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleAddEvent} variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlanningPage;
