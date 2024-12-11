import "./Toast.css";
import { useVideoManagement } from "../../hooks/useVideoManagement";

export const Toast = () => {
  const { toastDetails } = useVideoManagement();

  return (
    <span
      className={`toastDiv ${
        toastDetails.active ? `show-toast ${toastDetails.type}` : ""
      } `}
    >
      {toastDetails?.toastMessage}
    </span>
  );
};
