import React, { useEffect } from 'react';
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
  Button
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { MissionType } from '../../hooks/useGetMissionTypes';
import MissionTypeColor from '../../pages/PlanningPage/MissionType/MissionType';
import { CreateMissionPayload } from '../../hooks/useCreateMission';
import { enqueueSnackbar } from '../../utils/snackbarUtils';
import { EventImpl } from '@fullcalendar/core/internal';
import styles from './AddMissionDrawer.module.scss';
import { toISOStringWithTimezone } from '../../utils/dates';

interface AddMissionDrawerProps {
  /**
   * Ouverture drawer
   */
  isOpen: boolean;
  /**
   * Liste des employées
   */
  employees?: Array<{
    /**
     * Id de l'employée
     */
    id: number,
    /**
     * Nom complet
     */
    fullName: string,
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
   * Types de mission
   */
  missionTypes?: MissionType[];
  /**
   * Mission correspondant à l'évènement
   */
  mission: EventImpl | null;
  /**
   * Evènement à la création d'une mission
   */
  onCreate: (payload: CreateMissionPayload) => void;
  /**
   * Evènement lors de la fermeture
   */
  onClose: () => void;
}

const AddMissionDrawer: React.FC<AddMissionDrawerProps> = ({
  isOpen,
  employees,
  startDate,
  endDate,
  missionTypes,
  mission = null,
  onCreate,
  onClose,
}) => {
  const [selectedEmployees, setSelectedEmployees] = React.useState<string[]>([]);
  const [selectedMissionType, setSelectedMissionType] = React.useState<number | "">("");
  const [start, setStart] = React.useState(startDate || '');
  const [end, setEnd] = React.useState(endDate || '');
  const [companyName, setCompanyName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('FR');
  const [details, setDetails] = React.useState('');

  const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({});

  const countryList = [
    { code: 'FR', name: 'France' },
    { code: 'BE', name: 'Belgique' },
    { code: 'CH', name: 'Suisse' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'DE', name: 'Allemagne' },
    { code: 'ES', name: 'Espagne' },
    { code: 'IT', name: 'Italie' },
  ];

  useEffect(() => {
    if (isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    setStart(startDate || '');
  }, [startDate]);

  useEffect(() => {
    setEnd(endDate || '');
  }, [endDate]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedEmployees(event.target.value as string[]);
  };

  const handleMissionTypeChange = (event: SelectChangeEvent<number>) => {
    setSelectedMissionType(Number(event.target.value));
  };

  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {
      start: !start,
      end: !end,
      missionType: !selectedMissionType,
      companyName: !companyName,
      email: !email,
      phone: !phone,
      address: !address,
      city: !city,
      postalCode: !postalCode,
      country: !countryCode,
      employees: selectedEmployees.length === 0,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleCreate = () => {
    if (!validateFields()) {
      enqueueSnackbar('Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    const isoStartDate = toISOStringWithTimezone(new Date(start));
    const isoEndDate = toISOStringWithTimezone(new Date(end));

    const payload: CreateMissionPayload = {
      description: details,
      timeBegin: isoStartDate,
      timeEnd: undefined,
      estimatedEnd: isoEndDate,
      address,
      city,
      postalCode,
      countryCode,
      missionTypeId: selectedMissionType as number,
      accountAssignIds: selectedEmployees.map(Number),
      pictures: [],
    };
    onCreate(payload);

    setStart(startDate || '');
    setEnd(endDate || '');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setCountryCode('FR');
    setDetails('');
    setSelectedEmployees([]);
    setSelectedMissionType('');
    setErrors({});
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className={styles.drawerContent}>
        <h2>Ajouter une mission</h2>

        <section className={styles.section}>
          <h3>Informations sur l'intervention</h3>
          <div className={styles.row}>
            <TextField
              label="Date de début"
              type="datetime-local"
              fullWidth
              value={!mission ? start : new Date((mission.start ?? '')).toISOString().slice(0, 16)}
              onChange={(e) => setStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.start}
              disabled={!!mission}
            />
            <TextField
              label="Date de fin estimé"
              type="datetime-local"
              fullWidth
              value={!mission ? end : new Date((mission.end ?? '')).toISOString().slice(0, 16)}
              onChange={(e) => setEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.end}
              disabled={!!mission}
            />
          </div>

          <div className={styles.row}>
            <FormControl fullWidth error={errors.missionType}>
              <InputLabel id="mission-type-label">Type de mission</InputLabel>
              <Select
                labelId="mission-type-label"
                value={!mission ? selectedMissionType : mission.extendedProps.categorie}
                onChange={handleMissionTypeChange}
                input={<OutlinedInput label="Type de mission" />}
                disabled={!!mission}
              >
                {missionTypes?.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    <MissionTypeColor code={type.shortLibel} nom={type.longLibel} color={type.color} />
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
              disabled={!!mission}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Email de l'entreprise"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              disabled={!!mission}
            />
            <TextField
              label="Numéro de l'entreprise"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              disabled={!!mission}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Adresse"
              fullWidth
              value={!mission ? address : mission.extendedProps.adresse}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address}
              disabled={!!mission}
            />
            <TextField
              label="Ville"
              fullWidth
              value={!mission ? city : mission.extendedProps.city}
              onChange={(e) => setCity(e.target.value)}
              error={errors.city}
              disabled={!!mission}
            />
          </div>
          <div className={styles.row}>
            <TextField
              label="Code postal"
              type="number"
              fullWidth
              value={!mission ? postalCode : mission.extendedProps.postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              error={errors.postalCode}
              disabled={!!mission}
            />
            <Select
              labelId="country-select-label"
              id="country-select"
              value={!mission ? countryCode : mission.extendedProps.countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              fullWidth
              disabled={!!mission}
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
            value={!mission ? details : mission.extendedProps.description}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Ajoutez des détails ici..."
            disabled={!!mission}
          />
        </section>

        <section className={styles.section}>
          <h3>Attribution</h3>
          <FormControl fullWidth error={errors.employees}>
            <InputLabel>Salariés</InputLabel>
            <Select
              multiple
              value={!mission ? selectedEmployees : mission.extendedProps.employees}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Salariés" />}
              renderValue={(selected) =>
                employees
                  ?.filter(emp => selected.includes(emp.id.toString()))
                  .map(emp => emp.fullName)
                  .join(', ')
              }
              disabled={!!mission}
            >
              {employees?.map((employee) => (
                <MenuItem key={employee.id} value={employee.id.toString()}>
                  <Checkbox checked={selectedEmployees.includes(employee.id.toString())} />
                  <ListItemText primary={employee.fullName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>

        {!mission && (
          <div className={styles.formValidationSection}>
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Créer
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default AddMissionDrawer;
