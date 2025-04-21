import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import DoneIcon from '@mui/icons-material/Done';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { SelectChangeEvent } from '@mui/material';
import IconButton from '../../../components/layout/IconButton/IconButton';
import { useCreateEmployee } from '../../../hooks/useCreateEmployee';
import { useRoles } from '../../../hooks/useRoles';
import styles from './CreateEmployeePage.module.scss';


type sideMenuButton = 'info' | 'notif' | 'doc' | 'param';

const CreateEmployeePage = () => {
  const { data: roles, isLoading } = useRoles();
  const { mutate: createEmployee } = useCreateEmployee();

  const countryList = [
    { code: 'FR', name: 'France' },
    { code: 'BE', name: 'Belgique' },
    { code: 'CH', name: 'Suisse' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'DE', name: 'Allemagne' },
    { code: 'ES', name: 'Espagne' },
    { code: 'IT', name: 'Italie' },
  ];

  // Champs du formulaire en erreur
  const [errorFields, setErrorFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    address: false,
    city: false,
    postalCode: false,
    role: false,
  });

  // Todo : rendre actif les boutons en fonction du scroll dans la page (non prioritaire)
  const [activeButton, setActiveButton] = useState<sideMenuButton>('info');
  const [selectedRole, setSelectedRole] = useState('');

  // Champs du formumaire
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

  // Snackbear pour connaire l'état de la création de l'employé
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');


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

  const checkAndSetFormErrors = () => {
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
  
    setErrorFields(newErrors);

    return Object.values(newErrors).some((e) => e);
  }

  const submitEmployee = () => {
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

    createEmployee(payload, {
      onSuccess: () => {
        resetFormFields();
        setErrorFields({
          firstName: false,
          lastName: false,
          email: false,
          phoneNumber: false,
          address: false,
          city: false,
          postalCode: false,
          role: false,
        });
        setSnackbarMessage('Employé créé avec succès !');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      },
      onError: () => {
        setSnackbarMessage("Échec lors de la création de l'employé.");
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    });
  };

  const handleSubmit = () => {
    const hasError = checkAndSetFormErrors();
    if (hasError) return;

    submitEmployee();
  };
  
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
              error={errorFields.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Prénom"
              variant="outlined"
              value={firstName}
              error={errorFields.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            </div>
            <div className={styles.input}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                error={errorFields.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Numéro de téléphone"
              variant="outlined"
              value={phoneNumber}
              error={errorFields.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Adresse"
              variant="outlined"
              value={address}
              error={errorFields.address}
              onChange={(e) => setAddress(e.target.value)}
            />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Ville"
              variant="outlined"
              value={city}
              error={errorFields.city}
              onChange={(e) => setCity(e.target.value)}
            />
            </div>
            <div className={styles.input}>
            <TextField
              fullWidth
              label="Code postal"
              variant="outlined"
              value={postalCode}
              error={errorFields.postalCode}
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
                  error={errorFields.role}
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </div>
  );
};

export default CreateEmployeePage;
