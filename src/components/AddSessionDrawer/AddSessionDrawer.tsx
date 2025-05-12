import React, { useEffect } from "react";
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
import styles from "./AddSessionDrawer.module.scss";

// interface AddSessionDrawerProps {
  //   /**
  //    * Ouverture drawer
  //    */
  //   isOpen: boolean;
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
  //   /**
  //    * Evènement lors de la fermeture
  //    */
  //   onClose: () => void;
// }

const AddSessionDrawer: React.FC = () => {
  return (
    <Drawer anchor="right">
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
            //   InputLabelProps={{ shrink: true }}
            //   error={errors.start}
            />
            <TextField
              label="Date de fin estimé"
              type="datetime-local"
              fullWidth
            //   value={end}
            //   onChange={(e) => setEnd(e.target.value)}
            //   InputLabelProps={{ shrink: true }}
            //   error={errors.end}
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
          
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h3>Commentaires supplémentaires</h3>
            <p>
              Vous pouvez ajouter des commentaires sur la session de travail pour votre employeur
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
            <p>
              Vous pouvez sélectionnés une mission qui vous est attribué
            </p>
            <hr />
          </div>
          
        </section>

        <div className={styles.btnContainer}>
          
        </div>
      </div>
    </Drawer>
  );
};

export default AddSessionDrawer;
