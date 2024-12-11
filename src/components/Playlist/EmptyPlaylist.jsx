import "./EmptyPlaylist.css";
import { Link } from "react-router-dom";

export const EmptyPlaylist = () => {
  return (
    <>
      <div className="emptyplaylist-container">
        <div className="emptyplaylist-header-container">Playlist Is Empty</div>
        <Link to="/">Add Videos</Link>
      </div>
    </>
  );
};
