import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

interface MissionEvent {
  title: string;
  start: string;
  end: string;
  adresse?: string;
  categorie?: string;
  description?: string;
}

interface AddMissionPlanningModalProps {
  open: boolean;
  onClose: () => void;
  event: MissionEvent;
  onChange: (field: keyof MissionEvent, value: string) => void;
  onSubmit: () => void;
}

const AddMissionPlanningModal: React.FC<AddMissionPlanningModalProps> = ({
  open,
  onClose,
  event,
  onChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter une mission</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Titre"
          fullWidth
          value={event.title}
          onChange={e => onChange('title', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Début"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={event.start}
          onChange={e => onChange('start', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Fin"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={event.end}
          onChange={e => onChange('end', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Adresse"
          fullWidth
          value={event.adresse}
          onChange={e => onChange('adresse', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Catégorie"
          fullWidth
          value={event.categorie}
          onChange={e => onChange('categorie', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={event.description}
          onChange={e => onChange('description', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onSubmit} variant="contained">Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMissionPlanningModal;
