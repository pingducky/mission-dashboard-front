import {  useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import IconButton from '../../../components/layout/IconButton/IconButton';
import { SelectChangeEvent } from '@mui/material';

import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DescriptionIcon from '@mui/icons-material/Description';
import DoneIcon from '@mui/icons-material/Done';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useRoles } from '../../../hooks/useRoles';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CreateEmployeePage.module.scss';
import { useCreateEmployee } from '../../../hooks/useCreateEmployee';

const CreateEmployeePage = () => {
  const { data: roles, isLoading } = useRoles();

  const { mutate: createEmployee } = useCreateEmployee();

  type buttonData = 'info' | 'notif' | 'doc' | 'param';

  const countryList = [
    { code: 'FR', name: 'France' },
    { code: 'BE', name: 'Belgique' },
    { code: 'CH', name: 'Suisse' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'DE', name: 'Allemagne' },
    { code: 'ES', name: 'Espagne' },
    { code: 'IT', name: 'Italie' },
  ];

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    address: false,
    city: false,
    postalCode: false,
    role: false,
  });

  const [activeButton, setActiveButton] = useState<buttonData>('info');
  const [selectedRole, setSelectedRole] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [countryCode, setCountryCode] = useState('FR');
  const [notificationMail, setNotificationMail] = useState(false);
  const [notificationSms, setNotificationSms] = useState(false);
  const [isGpsTrackingAllowed, setIsGpsTrackingAllowed] = useState(false);

  const resetFormFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setAddress('');
    setCity('');
    setPostalCode('');
    setCountryCode('FR');
    setNotificationMail(false);
    setNotificationSms(false);
    setIsGpsTrackingAllowed(false);
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = () => {
    const newErrors = {
      firstName: firstName.trim() === '',
      lastName: lastName.trim() === '',
      email: email.trim() === '',
      phoneNumber: phoneNumber.trim() === '',
      address: address.trim() === '',
      city: city.trim() === '',
      postalCode: postalCode.trim() === '',
      role: selectedRole === '',
    };
  
    setErrors(newErrors);
  
    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;
  
    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      countryCode,
      notificationMail,
      notificationSms,
      isGpsTrackingAllowed,
      isEnabled: true,
      roleIds: selectedRole ? [Number(selectedRole)] : [],
    };
  
    createEmployee(payload);
    resetFormFields();
    setErrors({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
      address: false,
      city: false,
      postalCode: false,
      role: false,
    });
  };
  
  
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
      <IconButton
        specialClass={styles.menuBtn}
        startIcon={<InfoOutlineIcon />}
        text="Informations générales"
        variant="ghost"
        isRounded
        color={"darkGray"}
        isActive={activeButton === 'info'}
        onClick={() => {setActiveButton('info')}}
      />
      <IconButton
        startIcon={<NotificationsNoneIcon />}
        text="Notifications"
        variant="ghost"
        isRounded
        color={"darkGray"}
        isActive={activeButton === 'notif'}
        onClick={() => {setActiveButton('notif')}}
      />
      <IconButton
        startIcon={<DescriptionIcon />}
        text="Documents"
        variant="ghost"
        isRounded
        color={"darkGray"}
        isActive={activeButton === 'doc'}
        onClick={() => {setActiveButton('doc')}}
      />
      <IconButton
        startIcon={<BusinessCenterIcon />}
        text="Paramètres entreprise"
        variant="ghost"
        isRounded
        color={"darkGray"}
        isActive={activeButton === 'param'}
        onClick={() => {setActiveButton('param')}}
      />
    </div>

      <div className={styles.separator} />

      <div className={styles.content}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Informations générales</p>
          <p className={styles.subSectionTitle}>Vous pouvez ajouter ou consulter vos documents administratifs</p>

          <div className={styles.formGrid}>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Nom"
              variant="outlined"
              value={lastName}
              error={errors.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Prénom"
              variant="outlined"
              value={firstName}
              error={errors.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            </div>
            <div className={styles.input}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Numéro de téléphone"
              variant="outlined"
              value={phoneNumber}
              error={errors.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Adresse"
              variant="outlined"
              value={address}
              error={errors.address}
              onChange={(e) => setAddress(e.target.value)}
            />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Ville"
              variant="outlined"
              value={city}
              error={errors.city}
              onChange={(e) => setCity(e.target.value)}
            />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Code postal"
              variant="outlined"
              value={postalCode}
              error={errors.postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            </div>
            <div className={styles.input}>
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

          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Notifications</p>
          <p className={styles.subSectionTitle}>Vous pouvez modifier préférences en termes de notifications</p>
          <div className={styles.checkboxGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={notificationMail}
                onChange={(e) => setNotificationMail(e.target.checked)}
              />
            }
            label="Recevoir les emails"
          />
            <FormControlLabel
              control={
                <Checkbox
                  checked={notificationSms}
                  onChange={(e) => setNotificationSms(e.target.checked)}
                />
              }
              label="Recevoir les SMS"
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Documents</p>
          <p className={styles.subSectionTitle}>Vous pouvez ajouter ou consulter vos documents administratifs</p>               
          <p>Oups, la fonctionnalité n'est pas encore créé.</p>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Paramètres de l'entreprise</p>
          <p className={styles.subSectionTitle}>Vous pouvez modifier préférences en termes de notifications</p>
          <div className={styles.checkboxGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isGpsTrackingAllowed}
                onChange={(e) => setIsGpsTrackingAllowed(e.target.checked)}
              />
            }
            label="J’accepte que l’on visualise ma localisation lors du pointage"
          />
          </div>
          {!isLoading && (
              <div className={styles.selectRole}>
                <InputLabel id="role-select-label">Rôle</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  fullWidth
                  error={errors.role}
                >
                  {roles?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.longLibel}
                    </MenuItem>
                  ))}
                </Select>
                </div>
            )}
        </div>

        <div className={styles.validateButtons}>
          <IconButton
            text='annuler'
            variant='outlined'
            isRounded
            startIcon={<CloseIcon/>}
          />

          <IconButton
            text='Enregistrer les changements'
            variant='filled'
            isRounded
            startIcon={<DoneIcon />}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeePage;
