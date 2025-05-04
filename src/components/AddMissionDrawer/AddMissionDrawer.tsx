import React from 'react';
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
import styles from './AddMissionDrawer.module.scss';
import MissionTypeColor from '../../pages/PlanningPage/MissionType/MissionType';
import { CreateMissionPayload } from '../../hooks/useCreateMission';
import { enqueueSnackbar } from '../../utils/snackbarUtils';

interface AddMissionDrawerProps {
  isOpen: boolean;
  employees: string[];
  startDate?: string;
  endDate?: string;
  missionTypes?: MissionType[];
  onCreate: (payload: CreateMissionPayload) => void;
  onClose: () => void;
}

const AddMissionDrawer: React.FC<AddMissionDrawerProps> = ({
  isOpen,
  startDate,
  endDate,
  missionTypes,
  onCreate,
  onClose
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

  React.useEffect(() => {
    if (isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedEmployees(typeof value === 'string' ? value.split(',') : value);
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

  const pad = n => String(Math.floor(Math.abs(n))).padStart(2, '0');

const getTimezoneOffset = date => {
  const tzOffset = -date.getTimezoneOffset();
  const sign = tzOffset >= 0 ? '+' : '-';
  return sign + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);
};

const toISOStringWithTimezone = date => {
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    getTimezoneOffset(date);
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
    timeEnd: isoEndDate,
    estimatedEnd: undefined,
    address,
    city,
    postalCode,
    countryCode,
    missionTypeId: selectedMissionType as number,
    accountAssignIds: selectedEmployees.map(() => 1),
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

  React.useEffect(() => {
    setStart(startDate || '');
  }, [startDate]);
  
  React.useEffect(() => {
    setEnd(endDate || '');
  }, [endDate]);

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
              value={start}
              onChange={(e) => setStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={errors.start}
            />
            <TextField
              label="Date de fin"
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
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {['Hugo', 'Elise', 'Corentin'].map((employee) => (
                <MenuItem key={employee} value={employee}>
                  <Checkbox checked={selectedEmployees.includes(employee)} />
                  <ListItemText primary={employee} />
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

export default AddMissionDrawer;
