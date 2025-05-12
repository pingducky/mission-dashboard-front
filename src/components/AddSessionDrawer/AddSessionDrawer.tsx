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

interface AddSessionDrawerProps {
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
}

const AddSessionDrawer: React.FC<AddSessionDrawerProps> = () => {
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
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.end}
            />
          </div>

          <div className={styles.row}>
            <FormControl fullWidth error={errors.missionType}>
              <InputLabel id="mission-type-label">Type de mission</InputLabel>
              <Select
                labelId="mission-type-label"
                value={selectedMissionType}
                onChange={handleMissionTypeChange}
                input={<OutlinedInput label="Type de mission" />}
              >
                {missionTypes?.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    <MissionTypeColor
                      code={type.shortLibel}
                      nom={type.longLibel}
                      color={type.color}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </section>

        <section className={styles.section}>
          <h3>Informations client</h3>
          <div className={styles.row}>
            <TextField
              label="Nom de l'entreprise"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              error={errors.companyName}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Email de l'entreprise"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <TextField
              label="Numéro de l'entreprise"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Adresse"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address}
            />
            <TextField
              label="Ville"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={errors.city}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Code postal"
              type="number"
              fullWidth
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              error={errors.postalCode}
            />
            <Select
              labelId="country-select-label"
              id="country-select"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              fullWidth
            >
              {countryList.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </section>

        <section className={styles.section}>
          <h3>Informations supplémentaires</h3>
          <TextField
            label="Détails"
            multiline
            minRows={5}
            fullWidth
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Ajoutez des détails ici..."
          />
        </section>

        <section className={styles.section}>
          <h3>Attribution</h3>
          <FormControl fullWidth error={errors.employees}>
            <InputLabel>Salariés</InputLabel>
            <Select
              multiple
              value={selectedEmployees}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Salariés" />}
              renderValue={(selected) =>
                employees
                  ?.filter((emp) => selected.includes(emp.id.toString()))
                  .map((emp) => emp.fullName)
                  .join(", ")
              }
            >
              {employees?.map((employee) => (
                <MenuItem key={employee.id} value={employee.id.toString()}>
                  <Checkbox
                    checked={selectedEmployees.includes(employee.id.toString())}
                  />
                  <ListItemText primary={employee.fullName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>

        <div className={styles.footer}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Créer
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default AddSessionDrawer;
