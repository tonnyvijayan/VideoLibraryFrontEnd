import "./EmptyWatchLater.css";
import { Link } from "react-router-dom";

export const EmptyWatchLater = () => {
  return (
    <>
      <div className="emptywatchlater-container">
        <div className="emptywatchlater-header-container">
          Watch Later Is Empty
        </div>
        <Link to="/">Add Videos</Link>
      </div>
    </>
  );
};
