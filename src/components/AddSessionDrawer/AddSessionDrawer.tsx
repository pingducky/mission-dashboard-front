import React, { useEffect, useState } from "react";
import { Drawer, TextField, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import IconButton from "../layout/IconButton/IconButton";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useGetMissionsByAccount } from "../../hooks/useGetMissionsByAccount";
import { getUserDataFromToken } from "../../utils/auth";
import { CreateSessionPayload } from "../../hooks/useCreateSession";
import { enqueueSnackbar } from "../../utils/snackbarUtils";
import styles from "./AddSessionDrawer.module.scss";

interface AddSessionDrawerProps {
  /**
   * Ouverture drawer
   */
  isOpen: boolean;
  /**
   * Liste des missions
   */
  missions?: Array<{
    /**
     * Id de la mission
     */
    id: number;
    /**
     * Titre de la mission
     */
    title: string;
    /**
     * Date début de la mission
     */
    start: Date;
    /**
     * Date de fin estimée de la mission
     */
    end: Date;
    /**
     * Adresse postal de la mission
     */
    adresse: string;
  }>;
  /**
   * Date de début
   */
  startDate?: string;
  /**
   * Date de fin
   */
  endDate?: string;
  /**
   * Evènement à la création d'une mission
   */
  onCreate: (payload: CreateSessionPayload) => void;
  /**
   * Evènement lors de la fermeture
   */
  onClose: () => void;
}

const AddSessionDrawer: React.FC<AddSessionDrawerProps> = ({
  isOpen,
  missions,
  startDate,
  endDate,
  onCreate,
  onClose,
}) => {
  const [pauses, setPauses] = useState<
    { start: string; end: string; error: boolean }[]
  >([]);
  const [selectedMissions, setSelectedMissions] = useState<string>("");
  const [interventionDate, setInterventionDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>(startDate || "");
  const [endTime, setEndTime] = useState<string>(endDate || "");

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  // Effect Hook pour réinitialiser les erreurs
  useEffect(() => {
    if (isOpen) setErrors({});
  }, [isOpen]);

  // // Effet pour la mise à jour des heures de début et de fin
  useEffect(() => setStartTime(startDate || ""), [startDate]);
  useEffect(() => setEndTime(endDate || ""), [endDate]);

  useEffect(() => setStartTime(startDate || ""), [startDate]);
  useEffect(() => setEndTime(endDate || ""), [endDate]);


  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {
      startTime: !startTime,
      endTime: !endTime,
      pauses: !pauses,
      missions: selectedMissions.length === 0,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const toISOStringWithTimezone = (date: string, time: string) => {
    return new Date(`${date}T${time}`).toISOString();
  };

  const handleDateChange = (value: string) => setInterventionDate(value);
  const handleStartTimeChange = (value: string) => setStartTime(value);
  const handleEndTimeChange = (value: string) => setEndTime(value);

  const handleCreate = () => {
    if (!validateFields()) {
      enqueueSnackbar(
        "Veuillez remplir tous les champs obligatoires.",
        "error"
      );
      return;
    }

    // Récupération de l'idAccount depuis le token
    const tokenData = getUserDataFromToken();
    if (!tokenData?.id) {
      enqueueSnackbar("Erreur : identifiant de compte manquant.");
      return;
    }

    const isoStartDate = toISOStringWithTimezone(interventionDate, startTime);
    const isoEndDate = toISOStringWithTimezone(interventionDate, endTime);

    const payload: CreateSessionPayload = {
      idAccount: Number(tokenData.id),
      idMission: Number(selectedMissions),
      startTime: isoStartDate,
      endTime: isoEndDate,
      status,
      pauses: [],
    };

    onCreate(payload);

    setInterventionDate("");
    setStartTime("");
    setEndTime("");
    setSelectedMissions("");
    setErrors({});
  };

  const handleCancel = () => {
    setPauses([]);
    setSelectedMissions("");
    setStartTime("");
    setEndTime("");
    onClose();
  };

  const addPause = () => {
    if (!startTime || !endTime) return;
    setPauses([...pauses, { start: "", end: "", error: false }]);
  };

  const removePause = (index: number) => {
    setPauses(pauses.filter((_, i) => i !== index));
  };

  const handlePauseChange = (index: number, field: string, value: string) => {
    const updatedPauses = [...pauses];
    updatedPauses[index][field] = value;

    const start = new Date(`${interventionDate}T${updatedPauses[index].start}`);
    const end = new Date(`${interventionDate}T${updatedPauses[index].end}`);
    const sessionStart = new Date(`${interventionDate}T${startTime}`);
    const sessionEnd = new Date(`${interventionDate}T${endTime}`);

    const isInvalid = start < sessionStart || end > sessionEnd || start >= end;
    updatedPauses[index].error = isInvalid;

    setPauses(updatedPauses);
  };

  // const handleMissionChange = (event: SelectChangeEvent<string[]>) => {
  //   setSelectedMissions(event.target.value as string[]);
  // };

  // const tokenData = getUserDataFromToken();
  // const getWeekRange = (date: Date) => {
  //   const day = date.getDay();
  //   const diffToMonday = (day === 0 ? -6 : 1) - day;
  //   const monday = new Date(date);
  //   monday.setDate(date.getDate() + diffToMonday);
  //   const sunday = new Date(monday);
  //   sunday.setDate(monday.getDate() + 6);
  //   return {
  //     monday: monday.toISOString(),
  //     sunday: sunday.toISOString(),
  //   };
  // };
  // const today = new Date();
  // const calculateDateRange = (viewMode: string, date: Date) => {
  //   const todayISO = date.toISOString();
  //   if (viewMode === "timeGridDay") {
  //     return {
  //       from: todayISO,
  //       to: new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString(),
  //     };
  //   } else {
  //     const weekRange = getWeekRange(date);
  //     return {
  //       from: weekRange.monday,
  //       to: weekRange.sunday,
  //     };
  //   }
  // };
  // // const { from, to } = calculateDateRange(viewMode, today);
  // // // Chargement des missions
  // // const { data: missions } = useGetMissionsByAccount(
  // //   {
  // //     accountId: tokenData!.id,
  // //     from: from,
  // //     to: to,
  // //   },
  // //   Boolean(interventionDate) // Ne fait la requête que si la date est définie
  // // );

  //   setSelectedMission(event.target.value);

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
              label="Date d'intervention"
              type="date"
              fullWidth
              value={interventionDate}
              onChange={(e) => handleDateChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.start}
            />
            <TextField
              label="Heure de début"
              type="time"
              fullWidth
              value={startTime}
              onChange={(e) => handleStartTimeChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Heure de fin"
              type="time"
              fullWidth
              value={endTime}
              onChange={(e) => handleEndTimeChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            {/* <TextField
              label="Date de début"
              type="datetime-local"
              fullWidth
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.startTime}
            />
            <TextField
              label="Date de fin estimé"
              type="datetime-local"
              fullWidth
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.endTime}
            /> */}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h3>Gestion des pauses</h3>
            <p>
              Vous pouvez ajouter les pauses pendant votre session de travail
            </p>
            <p className={styles.textWarning}>
              Les pauses ajoutés seront soustraits de vos heures de travail
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
            isDisabled={!startTime && !endTime}
          />
          {pauses.map((pause, index) => (
            <div key={index} className={styles.pauseRow}>
              <TextField
                label="Début pause"
                type="time"
                fullWidth
                value={pause.start}
                error={pause.error}
                helperText={
                  pause.error
                    ? "L'heure de pause n'est pas comprise dans la date d'intervention"
                    : ""
                }
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handlePauseChange(index, "start", e.target.value)
                }
              />
              <TextField
                label="Fin pause"
                type="time"
                fullWidth
                value={pause.end}
                error={pause.error}
                helperText={
                  pause.error
                    ? "L'heure de pause n'est pas comprise dans la date d'intervention"
                    : ""
                }
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

        {/* <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h3>Commentaires supplémentaires</h3>
            <p>
              Vous pouvez ajouter des commentaires sur la session de travail
              pour votre employeur
            </p>
            <hr />
          </div>
          <TextField
            label="Commentaires"
            multiline
            minRows={5}
            fullWidth
            value={details}
            // onChange={(e) => setDetails(e.target.value)}
            placeholder="Ajoutez des commentaires ici..."
          />
        </section> */}

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <h3>Choix d’une mission existante (optionnel)</h3>
            <p>Vous pouvez sélectionnés une mission qui vous est attribué</p>
            <hr />
          </div>
          {/* {!interventionDate ? (
            <p>Veuillez choisir une date d'intervention.</p>
          ) : missions && missions.length > 0 ? (
            <Select
              value={selectedMission}
              onChange={handleMissionChange}
              fullWidth
            >
              {missions.map((mission) => (
                <MenuItem key={mission.id} value={mission.id}>
                  {mission.description} - {mission.timeBegin}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <p>Aucune mission vous est attribuée ce jour.</p>
          )} */}
          {/* {!interventionDate ? (
            <p>Veuillez choisir une date d'intervention.</p>
          ) : missions?.length === 0 ? (
            <p>Aucune mission vous est attribuée ce jour.</p>
          ) : (
            <Select
              value={selectedMission}
              onChange={handleMissionChange}
              fullWidth
            >
              {missions?.map((mission) => (
                <MenuItem key={mission.id} value={mission.id}>
                  {mission.description} - {mission.timeBegin}
                </MenuItem>
              ))}
            </Select>
          )} */}
          {/*
          <Select
            value={selectedMission}
            onChange={handleMissionChange}
            fullWidth
          >
            {missions?.map((mission) => (
              <MenuItem key={mission.id} value={mission.id}>
                {mission.description} - {mission.timeBegin}
              </MenuItem>
            ))}
          </Select>*/}
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
            onClick={handleCreate}
            // isDisabled={isLoading}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default AddSessionDrawer;
