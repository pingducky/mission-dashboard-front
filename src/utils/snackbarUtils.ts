// snackbarUtils.ts
import { VariantType, OptionsObject, SnackbarKey } from 'notistack';

let snackbarRef: ((msg: string, options?: OptionsObject) => SnackbarKey) | null = null;

export const setSnackbarRef = (
  enqueue: (msg: string, options?: OptionsObject) => SnackbarKey
) => {
  snackbarRef = enqueue;
};

export const enqueueSnackbar = (message: string, variant?: VariantType) => {
  if (snackbarRef) {
    snackbarRef(message, variant ? { variant } : undefined);
  } else {
    console.warn('Snackbar is not ready yet.');
  }
};
