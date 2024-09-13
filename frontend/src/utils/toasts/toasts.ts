import { toast } from 'react-toastify';

export const error = (message: string, autoCloseTime?: number) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: autoCloseTime || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });

export const success = (message: string, autoCloseTime?: number) =>
  toast.success(message, {
    position: 'top-center',
    autoClose: autoCloseTime || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
