import "./Toast.css";

import { useVideoManagement } from "../../hooks/useVideoManagement";

export const Toast = () => {
  const { toastDetails } = useVideoManagement();

  return (
    <div
      className={`toastDiv ${
        toastDetails.active ? `show-toast ${toastDetails.type}` : ""
      } `}
    >
      {toastDetails?.toastMessage}
    </div>
  );
};
