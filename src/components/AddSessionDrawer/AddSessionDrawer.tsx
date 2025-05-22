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
import { toISOStringWithTimezone, toParisISOStringV2Two } from "../../utils/dates";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./AddSessionDrawer.module.scss";

interface AddSessionDrawerProps {
  /**
   * Ouverture drawer
   */
  isOpen: boolean;
  /**
   * Temporalité de début
   */
  startDate?: string;
  /**
   * Temporalité de fin
   */
  endDate?: string;
  /**
   * Compte sélectionné
   */
  selectedAccountId?: string,
  /**
   * Evènement lors de la fermeture
   */
  onClose: () => void;
}

const AddSessionDrawer: React.FC<AddSessionDrawerProps> = ({
  isOpen,
  startDate,
  endDate,
  selectedAccountId,
  onClose,
}) => {
  const [pauses, setPauses] = useState<
    { start: string; end: string; error: boolean }[]
  >([]);
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);

  const [interventionDate, setInterventionDate] = useState<string>('2025-05-22');
  const [startTime, setStartTime] = useState<string>(startDate || "");
  const [endTime, setEndTime] = useState<string>(endDate || "");

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) setErrors({});
  }, [isOpen]);

  // useEffect(() => setStartTime(startDate || ""), [startDate]);
  // useEffect(() => setEndTime(endDate || ""), [endDate]);
  
  useEffect(() => {
    if(startDate) {
      setInterventionDate(toISOStringWithTimezone(new Date(startDate)).split('T')[0])
    }
  }, [startDate])
  
  const validateFields = () => {
    if (!interventionDate || !startTime || !endTime) {
      setErrors({});
      return false;
    }

    const newErrors: { [key: string]: boolean } = {
      interventionDate: !interventionDate,
      startTime: !startTime,
      endTime: !endTime,
    };

    const startDateTime = new Date(`${interventionDate}T${startTime}`);
    const endDateTime = new Date(`${interventionDate}T${endTime}`);

    if (startDateTime >= endDateTime) {
      newErrors.startTime = true;
      newErrors.endTime = true;
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleDateChange = (value: string) => {
    setInterventionDate(value);
    validateFields();
  };

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    validateFields();
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
    validateFields();
  };
  const tokenData = useMemo(() => getUserDataFromToken(), []);

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

    // Vérifier si une pause est invalide
    if (pauses.some((pause) => pause.error)) {
      enqueueSnackbar(
        "Une ou plusieurs pauses ne sont pas comprises dans les heures d'intervention.",
        "error"
      );
      return;
    }

    const isoStartDate = toParisISOStringV2Two(interventionDate, startTime);
    const isoEndDate = toParisISOStringV2Two(interventionDate, endTime);

    if (new Date(isoStartDate) >= new Date(isoEndDate)) {
      enqueueSnackbar(
        "La date/heure de début doit être antérieure à la date/heure de fin.",
        "error"
      );
      return;
    }

    // Formater les pauses
    const formattedPauses = pauses
      .filter((pause) => pause.start && pause.end)
      .map((pause) => ({
        pauseTime: toParisISOStringV2Two(interventionDate, pause.start),
        resumeTime: toParisISOStringV2Two(interventionDate, pause.end),
      }));

    const payload = {
      idAccount:  Number(selectedAccountId || tokenData.id),
      idMission: Number(selectedMissions),
      startTime: isoStartDate,
      endTime: isoEndDate,
      status: "ended",
      pauses: formattedPauses,
    };
    
    try {
      await createSession(payload);
      enqueueSnackbar("Session créée avec succès", "success");
      queryClient.invalidateQueries({
        queryKey: ["workSessions"],
      });
      onClose();
      setInterventionDate("");
      setStartTime("");
      setEndTime("");
      setPauses([]);
      setSelectedMissions([]);
      setErrors({});
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, "error");
      } else {
        enqueueSnackbar("Erreur lors de la création de la mission", "error");
      }
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

    // Validation : la pause doit être comprise entre startTime et endTime
    const pauseStart = field === "start" ? value : updatedPauses[index].start;
    const pauseEnd = field === "end" ? value : updatedPauses[index].end;

    // Vérifier que pauseStart et pauseEnd sont dans la session
    const isValidPause =
      pauseStart >= startTime && pauseEnd <= endTime && pauseStart < pauseEnd;

    updatedPauses[index].error = !isValidPause;

    setPauses(updatedPauses);
  };

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

  const missionQueryParams = useMemo(() => {
    // Construire la date/heure de début et de fin en utilisant les champs d'intervention
    const from = interventionDate && startTime 
      ? toParisISOStringV2Two(interventionDate, startTime) 
      : defaultFrom;

    const to = interventionDate && endTime 
      ? toParisISOStringV2Two(interventionDate, endTime) 
      : defaultTo;

    return {
      accountId: selectedAccountId || tokenData!.id,
      from,
      to,
    };
  }, [calendarStartDate, calendarEndDate, interventionDate, startTime, endTime, defaultFrom, defaultTo]);


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
              value={interventionDate }
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
              error={errors.startTime}
              helperText={
                errors.startTime
                  ? "La date/heure de début doit être avant la date/heure de fin."
                  : ""
              }
            />
            <TextField
              label="Heure de fin"
              type="time"
              fullWidth
              value={endTime}
              onChange={(e) => handleEndTimeChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.endTime}
              helperText={
                errors.endTime
                  ? "La date/heure de fin doit être après la date/heure de début."
                  : ""
              }
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
import { toISOStringWithTimezone, toParisISOStringV2Two } from "../../utils/dates";
import styles from "./AddSessionDrawer.module.scss";
import { useQueryClient } from "@tanstack/react-query";

interface AddSessionDrawerProps {
  isOpen: boolean;
  startDate?: string;
  endDate?: string;
  onClose: () => void;
  selectedAccountId?: string,
}

const AddSessionDrawer: React.FC<AddSessionDrawerProps> = ({
  isOpen,
  startDate,
  endDate,
  selectedAccountId,
  onClose,
}) => {
  const [pauses, setPauses] = useState<
    { start: string; end: string; error: boolean }[]
  >([]);
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);

  const [interventionDate, setInterventionDate] = useState<string>('2025-05-22');
  const [startTime, setStartTime] = useState<string>(startDate || "");
  const [endTime, setEndTime] = useState<string>(endDate || "");

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) setErrors({});
  }, [isOpen]);

  // useEffect(() => setStartTime(startDate || ""), [startDate]);
  // useEffect(() => setEndTime(endDate || ""), [endDate]);
  
  useEffect(() => {
    if(startDate) {
      setInterventionDate(toISOStringWithTimezone(new Date(startDate)).split('T')[0])
    }
  }, [startDate])
  
  const validateFields = () => {
    if (!interventionDate || !startTime || !endTime) {
      setErrors({});
      return false;
    }

    const newErrors: { [key: string]: boolean } = {
      interventionDate: !interventionDate,
      startTime: !startTime,
      endTime: !endTime,
    };

    const startDateTime = new Date(`${interventionDate}T${startTime}`);
    const endDateTime = new Date(`${interventionDate}T${endTime}`);

    if (startDateTime >= endDateTime) {
      newErrors.startTime = true;
      newErrors.endTime = true;
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleDateChange = (value: string) => {
    setInterventionDate(value);
    validateFields();
  };

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    validateFields();
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
    validateFields();
  };
  const tokenData = useMemo(() => getUserDataFromToken(), []);

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

    // Vérifier si une pause est invalide
    if (pauses.some((pause) => pause.error)) {
      enqueueSnackbar(
        "Une ou plusieurs pauses ne sont pas comprises dans les heures d'intervention.",
        "error"
      );
      return;
    }

    const isoStartDate = toParisISOStringV2Two(interventionDate, startTime);
    const isoEndDate = toParisISOStringV2Two(interventionDate, endTime);

    if (new Date(isoStartDate) >= new Date(isoEndDate)) {
      enqueueSnackbar(
        "La date/heure de début doit être antérieure à la date/heure de fin.",
        "error"
      );
      return;
    }

    // Formater les pauses
    const formattedPauses = pauses
      .filter((pause) => pause.start && pause.end)
      .map((pause) => ({
        pauseTime: toParisISOStringV2Two(interventionDate, pause.start),
        resumeTime: toParisISOStringV2Two(interventionDate, pause.end),
      }));

    const payload = {
      idAccount:  Number(selectedAccountId || tokenData.id),
      idMission: Number(selectedMissions),
      startTime: isoStartDate,
      endTime: isoEndDate,
      status: "ended",
      pauses: formattedPauses,
    };
    
    try {
      await createSession(payload);
      enqueueSnackbar("Session créée avec succès", "success");
      queryClient.invalidateQueries({
        queryKey: ["workSessions"],
      });
      onClose();
      setInterventionDate("");
      setStartTime("");
      setEndTime("");
      setPauses([]);
      setSelectedMissions([]);
      setErrors({});
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, "error");
      } else {
        enqueueSnackbar("Erreur lors de la création de la mission", "error");
      }
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

    // Validation : la pause doit être comprise entre startTime et endTime
    const pauseStart = field === "start" ? value : updatedPauses[index].start;
    const pauseEnd = field === "end" ? value : updatedPauses[index].end;

    // Vérifier que pauseStart et pauseEnd sont dans la session
    const isValidPause =
      pauseStart >= startTime && pauseEnd <= endTime && pauseStart < pauseEnd;

    updatedPauses[index].error = !isValidPause;

    setPauses(updatedPauses);
  };

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

  const missionQueryParams = useMemo(() => {
    // Construire la date/heure de début et de fin en utilisant les champs d'intervention
    const from = interventionDate && startTime 
      ? toParisISOStringV2Two(interventionDate, startTime) 
      : defaultFrom;

    const to = interventionDate && endTime 
      ? toParisISOStringV2Two(interventionDate, endTime) 
      : defaultTo;

    return {
      accountId: selectedAccountId || tokenData!.id,
      from,
      to,
    };
  }, [calendarStartDate, calendarEndDate, interventionDate, startTime, endTime, defaultFrom, defaultTo]);


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
              value={interventionDate }
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
              error={errors.startTime}
              helperText={
                errors.startTime
                  ? "La date/heure de début doit être avant la date/heure de fin."
                  : ""
              }
            />
            <TextField
              label="Heure de fin"
              type="time"
              fullWidth
              value={endTime}
              onChange={(e) => handleEndTimeChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.endTime}
              helperText={
                errors.endTime
                  ? "La date/heure de fin doit être après la date/heure de début."
                  : ""
              }
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
