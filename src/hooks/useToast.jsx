import { useVideoManagement } from "./useVideoManagement";

export const useToast = () => {
  const { setToastDetails } = useVideoManagement();
  const showToast = (message, type) => {
    setToastDetails({ toastMessage: message, active: true, type: type });

    setTimeout(() => {
      setToastDetails({ toastMessage: "", active: false, type: "" });
    }, 4000);
  };

  return showToast;
};
