// SnackbarUtilsConfigurator.tsx
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { setSnackbarRef } from './snackbarUtils';

const SnackbarUtilsConfigurator = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setSnackbarRef(enqueueSnackbar);
  }, [enqueueSnackbar]);

  return null;
};

export default SnackbarUtilsConfigurator;
