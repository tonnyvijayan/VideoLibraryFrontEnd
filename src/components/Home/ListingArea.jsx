import "./ListingArea.css";
import { Login } from "../Login";
import { Routes, Route } from "react-router-dom";
import { VideoHome } from "../VideoHome/VideoHome";
import { SignUp } from "../SignUp";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { Playlist } from "../Playlist/Playlist";
import { PrivateRoute } from "../PrivateRoute";
import { PersistLogin } from "../PersistLogin";
import { Toast } from "../Toast/Toast";
import { WatchLater } from "../WatchLater/WatchLater";

export const ListingArea = () => {
  return (
    <>
      <div className="listing-div">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<VideoHome />} />
          <Route path="/videos/:videoId" element={<VideoPlayer />} />
          <Route element={<PersistLogin />}>
            <Route element={<PrivateRoute />}>
              <Route path="/watchlater" element={<WatchLater />} />
              <Route path="/playlist" element={<Playlist />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Toast />
    </>
  );
};
