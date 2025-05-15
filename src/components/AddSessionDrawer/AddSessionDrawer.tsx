import React, { useEffect, useMemo, useState } from "react";
import { Drawer, TextField, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import IconButton from "../layout/IconButton/IconButton";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useGetMissionsByAccount } from "../../hooks/useGetMissionsByAccount";
import { getUserDataFromToken } from "../../utils/auth";
import { useCreateSession } from "../../hooks/useCreateSession";
import { enqueueSnackbar } from "../../utils/snackbarUtils";
import styles from "./AddSessionDrawer.module.scss";

interface AddSessionDrawerProps {
  /**
   * Ouverture drawer
   */
  isOpen: boolean;
  /**
   * Date de début
   */
  startDate?: string;
  /**
   * Date de fin
   */
  endDate?: string;
  /**
   * Evènement lors de la fermeture
   */
  onClose: () => void;
}

const AddSessionDrawer: React.FC<AddSessionDrawerProps> = ({
  isOpen,
  startDate,
  endDate,
  onClose,
}) => {
  const [pauses, setPauses] = useState<
    { start: string; end: string; error: boolean }[]
  >([]);
  // const [selectedMissions, setSelectedMissions] = useState<string>("");
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);

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
      interventionDate: !interventionDate,
      startTime: !startTime,
      endTime: !endTime,
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
  // Récupération de l'idAccount depuis le token
  const tokenData = useMemo(() => getUserDataFromToken(), []);

  // Utilisation de votre hook useCreateSession
  const { mutateAsync: createSession } = useCreateSession();
  const handleCreate = async () => {
    if (!validateFields()) {
      enqueueSnackbar(
        "Veuillez remplir tous les champs obligatoires.",
        "error"
      );
      return;
    }

    if (!tokenData || !tokenData.id) {
      enqueueSnackbar("Erreur : identifiant de compte manquant.");
      return;
    }

    const isoStartDate = toISOStringWithTimezone(interventionDate, startTime);
    const isoEndDate = toISOStringWithTimezone(interventionDate, endTime);

    // Formater les pauses
    const formattedPauses = pauses
      .filter((pause) => pause.start && pause.end)
      .map((pause) => ({
        pauseTime: toISOStringWithTimezone(interventionDate, pause.start),
        resumeTime: toISOStringWithTimezone(interventionDate, pause.end),
      }));

    const payload = {
      idAccount: Number(tokenData.id),
      idMission: Number(selectedMissions),
      startTime: isoStartDate,
      endTime: isoEndDate,
      status: "ended", // ou le statut désiré
      pauses: formattedPauses,
    };

    try {
      // Appel à votre hook pour créer la session
      const response = await createSession(payload);
      enqueueSnackbar("Session créée avec succès", "success");
      onClose(); // Fermer le Drawer après la création
      // Réinitialiser les champs
      setInterventionDate("");
      setStartTime("");
      setEndTime("");
      setPauses([]);
      setSelectedMissions([]);
      setErrors({});
    } catch (error) {
      enqueueSnackbar(
        error.message || "Erreur lors de la création de la session",
        "error"
      );
    }
  };

  const handleCancel = () => {
    setPauses([]);
    setSelectedMissions([]);
    setInterventionDate("");
    setStartTime("");
    setEndTime("");
    onClose();
  };

  const pauseWarningMessage =
    "Veuillez sélectionner la date et les heures d'intervention pour ajouter une pause.";

  const addPause = () => {
    if (!startTime || !endTime) return;
    setPauses([...pauses, { start: "", end: "", error: false }]);
  };

  const removePause = (index: number) => {
    setPauses(pauses.filter((_, i) => i !== index));
  };

  const updatePause = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    const updatedPauses = [...pauses];
    updatedPauses[index][field] = value;
    setPauses(updatedPauses);
  };

  // MISSIONS
  const [viewMode, setViewMode] = useState<"timeGridDay" | "timeGridWeek">(
    "timeGridWeek"
  );
  const [calendarStartDate, setCalendarStartDate] = useState<string | null>(
    null
  );
  const [calendarEndDate, setCalendarEndDate] = useState<string | null>(null);

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
  const today = useMemo(() => new Date(), []);
  const defaultFrom = useMemo(
    () =>
      viewMode === "timeGridDay"
        ? today.toISOString()
        : getWeekRange(today).monday,
    [viewMode, today]
  );

  const defaultTo = useMemo(
    () =>
      viewMode === "timeGridDay"
        ? new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
        : getWeekRange(today).sunday,
    [viewMode, today]
  );

  // Préparer les paramètres en dehors de l'effet
  const missionQueryParams = useMemo(
    () => ({
      accountId: tokenData.id,
      from: calendarStartDate ?? defaultFrom,
      to: calendarEndDate ?? defaultTo,
    }),
    [calendarStartDate, calendarEndDate, defaultFrom, defaultTo]
  );

  const { data: missions } = useGetMissionsByAccount(missionQueryParams);

  const handleMissionChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedMissions(event.target.value as string[]);
  };

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
          {!(interventionDate && startTime && endTime) && (
            <p className={styles.noDate}>{pauseWarningMessage}</p>
          )}
          <IconButton
            text="Ajouter une pause"
            variant="filled"
            color="black"
            isRounded={false}
            startIcon={<AddOutlinedIcon />}
            onClick={addPause}
            isDisabled={!(interventionDate && startTime && endTime)}
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
                onChange={(e) => updatePause(index, "start", e.target.value)}
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
                onChange={(e) => updatePause(index, "end", e.target.value)}
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
            <h3>Choix d’une mission existante (optionnel)</h3>
            <p>Vous pouvez sélectionnés une mission qui vous est attribué</p>
            <hr />
          </div>
          {interventionDate && startTime && endTime ? (
            missions && missions.length > 0 ? (
              <Select
                value={selectedMissions}
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
            )
          ) : (
            <p className={styles.noDate}>{pauseWarningMessage}</p>
          )}
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
          />
        </div>
      </div>
    </Drawer>
  );
};

export default AddSessionDrawer;
