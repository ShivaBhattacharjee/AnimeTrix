import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const showErrorToast = (errorMessage) => {
    toast.error(errorMessage, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
  };
  
  export const showSuccessToast = (successMessage) => {
    toast.success(successMessage, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
  };
  
