import React, { useRef, useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import IconButton from '../../../components/layout/IconButton/IconButton';

import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import styles from './CreateEmployeePage.module.scss';

const CreateEmployeePage = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const paramRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeButton, setActiveButton] = useState<'info' | 'notif' | 'doc' | 'param'>('info');


  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current && contentRef.current) {
      const offset = 0;
      const targetPosition = ref.current.offsetTop - offset;
  
      contentRef.current.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
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
        onClick={() => {
          scrollTo(infoRef);
          setActiveButton('info');
        }}
      />
      <IconButton
        startIcon={<NotificationsNoneIcon />}
        text="Notifications"
        variant="ghost"
        isRounded
        color={"darkGray"}
        isActive={activeButton === 'notif'}
        onClick={() => {
          scrollTo(notifRef);
          setActiveButton('notif');
        }}
      />
      <IconButton
        startIcon={<DescriptionIcon />}
        text="Documents"
        variant="ghost"
        isRounded
        color={"darkGray"}
        isActive={activeButton === 'doc'}
        onClick={() => {
          scrollTo(docRef);
          setActiveButton('doc');
        }}
      />
      <IconButton
        startIcon={<BusinessCenterIcon />}
        text="Paramètres entreprise"
        variant="ghost"
        isRounded
        color={"darkGray"}
        isActive={activeButton === 'param'}
        onClick={() => {
          scrollTo(paramRef);
          setActiveButton('param');
        }}
      />
    </div>

      <div className={styles.separator} />

      <div className={styles.content} ref={contentRef}>
        <div ref={infoRef} className={styles.section}>
          <p className={styles.sectionTitle}>Informations générales</p>
          <p className={styles.subSectionTitle}>Vous pouvez ajouter ou consulter vos documents administratifs</p>

          <div className={styles.formGrid}>
            <div className={styles.input}>
              <TextField fullWidth label="Nom" variant="outlined" />
            </div>
            <div className={styles.input}>
              <TextField fullWidth label="Prénom" variant="outlined" />
            </div>
            <div className={styles.input}>
              <TextField fullWidth label="Email" variant="outlined" />
            </div>
            <div className={styles.input}>
              <TextField fullWidth label="Numéro de téléphone" variant="outlined" />
            </div>
            <div className={styles.input}>
              <TextField fullWidth label="Adresse" variant="outlined" />
            </div>
            <div className={styles.input}>
              <TextField fullWidth label="Ville" variant="outlined" />
            </div>
            <div className={styles.input}>
              <TextField fullWidth label="Code postal" variant="outlined" />
            </div>
            <div className={styles.input}>
              <TextField fullWidth label="Pays" variant="outlined" />
            </div>
          </div>
        </div>

        <div ref={notifRef} className={styles.section}>
          <p className={styles.sectionTitle}>Notifications</p>
          <p className={styles.subSectionTitle}>Vous pouvez modifier préférences en termes de notifications</p>
          <div className={styles.checkboxGroup}>
            <FormControlLabel control={<Checkbox />} label="Recevoir les emails" />
            <FormControlLabel control={<Checkbox />} label="Recevoir les SMS" />
          </div>
        </div>

        <div ref={docRef} className={styles.section}>
          <p className={styles.sectionTitle}>Documents</p>
          <p className={styles.subSectionTitle}>Vous pouvez ajouter ou consulter vos documents administratifs</p>               
        </div>

        <div ref={paramRef} className={styles.section}>
          <p className={styles.sectionTitle}>Paramètres de l'entreprise</p>
          <p className={styles.subSectionTitle}>Vous pouvez modifier préférences en termes de notifications</p>
          <div className={styles.checkboxGroup}>
            <FormControlLabel control={<Checkbox />} label="Recevoir les emails" />
            <FormControlLabel control={<Checkbox />} label="Recevoir les SMS" />
          </div>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeePage;
