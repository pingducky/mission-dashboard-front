import React, { useEffect, useState } from "react";
import {
  Drawer,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
// import { MissionType } from '../../hooks/useGetMissionTypes';
// import MissionTypeColor from '../../pages/PlanningPage/MissionType/MissionType';
// import { CreateMissionPayload } from '../../hooks/useCreateMission';
// import { enqueueSnackbar } from '../../utils/snackbarUtils';
import IconButton from "../layout/IconButton/IconButton";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import styles from "./AddSessionDrawer.module.scss";

interface AddSessionDrawerProps {
  /**
   * Ouverture drawer
   */
  isOpen: boolean;
  //   /**
  //    * Liste des employées
  //    */
  //   employees?: Array<{
  //     /**
  //      * Id de l'employée
  //      */
  //     id: number,
  //     /**
  //      * Nom complet
  //      */
  //     fullName: string,
  //   }>;
  //   /**
  //    * Date de début
  //    */
  //   startDate?: string;
  //   /**
  //    * Date de fin
  //    */
  //   endDate?: string;
  //   /**
  //    * Types de mission
  //    */
  //   missionTypes?: MissionType[];
  //   /**
  //    * Evènement à la création d'une mission
  //    */
  //   onCreate: (payload: CreateMissionPayload) => void;
  /**
   * Evènement lors de la fermeture
   */
  onClose: () => void;
}

const AddSessionDrawer: React.FC<AddSessionDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [pauses, setPauses] = useState([]);
  const [selectedMission, setSelectedMission] = useState("");
  const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({});

  const addPause = () => {
    setPauses([...pauses, { start: "", end: "" }]);
  };

  const removePause = (index) => {
    setPauses(pauses.filter((_, i) => i !== index));
  };

  const handlePauseChange = (index, field, value) => {
    const updatedPauses = [...pauses];
    updatedPauses[index][field] = value;
    setPauses(updatedPauses);
  };

  const handleMissionChange = (event) => {
    setSelectedMission(event.target.value);
  };

  const handleCancel = () => {
    setPauses([]);
    setSelectedMission("");
    onClose();
  };
  useEffect(() => {
    if (isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className={styles.drawerContent}>
        <h2>Création d'une session de travail</h2>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h3>Date et heure d'intervention</h3>
            <p>
              Vous pouvez ajouter la date et l’heure de votre session de travail
              sans prendre en compte les pauses
            </p>
            <hr />
          </div>

          <div className={styles.row}>
            <TextField
              label="Date de début"
              type="datetime-local"
              fullWidth
              //   value={start}
              //   onChange={(e) => setStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.start}
            />
            <TextField
              label="Date de fin estimé"
              type="datetime-local"
              fullWidth
              //   value={end}
              //   onChange={(e) => setEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.end}
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h3>Gestion des pauses</h3>
            <p>
              Vous pouvez ajouter les pauses pendant votre session de travail
            </p>
            <hr />
          </div>
          <IconButton
            text="Ajouter une pause"
            variant="filled"
            color="black"
            isRounded={false}
            startIcon={<AddOutlinedIcon />}
            onClick={addPause}
          />
          {pauses.map((pause, index) => (
            <div key={index} className={styles.pauseRow}>
              <TextField
                label="Début pause"
                type="datetime-local"
                value={pause.start}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handlePauseChange(index, "start", e.target.value)
                }
              />
              <TextField
                label="Fin pause"
                type="datetime-local"
                value={pause.end}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handlePauseChange(index, "end", e.target.value)
                }
              />
              <IconButton
                startIcon={<ClearOutlinedIcon />}
                onClick={() => removePause(index)}
                text={""}
                variant={"outlined"}
                isRounded={true}
                color="red"
                specialClass={styles.btnDeletePause}
              />
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h3>Commentaires supplémentaires</h3>
            <p>
              Vous pouvez ajouter des commentaires sur la session de travail
              pour votre employeur
            </p>
            <hr />
          </div>
          <TextField
            label="Détails"
            multiline
            minRows={5}
            fullWidth
            // value={details}
            // onChange={(e) => setDetails(e.target.value)}
            placeholder="Ajoutez les commentaires ici..."
          />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h3>Choix d’une mission existante (optionnel)</h3>
            <p>Vous pouvez sélectionnés une mission qui vous est attribué</p>
            <hr />
          </div>
          <Select
            value={selectedMission}
            onChange={handleMissionChange}
            fullWidth
          >
            <MenuItem value="mission1">Mission 1</MenuItem>
            <MenuItem value="mission2">Mission 2</MenuItem>
            <MenuItem value="mission3">Mission 3</MenuItem>
          </Select>
        </section>

        <div className={styles.btnContainer}>
          <IconButton
            text="Annuler"
            variant="outlined"
            color="red"
            isRounded={false}
            startIcon={<ClearOutlinedIcon />}
            onClick={handleCancel}
          />
          <IconButton
            text="Enregistrer"
            variant="filled"
            color="darkblue"
            isRounded={false}
            startIcon={<CheckOutlinedIcon />}
            // onClick={() => setOpenDialog(true)}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default AddSessionDrawer;
