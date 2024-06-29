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
import { Investing } from "../VideoHome/Investing";
import { Trading } from "../VideoHome/Trading";
import { Economy } from "../VideoHome/Economy";
import { RouteNotFound } from "../RouteNotFound/RouteNotFound";

export const ListingArea = () => {
  return (
    <>
      <div className="listing-div">
        <Routes>
          <Route path="/" element={<VideoHome />} />
          <Route path="/videos/:videoId" element={<VideoPlayer />} />
          <Route path="/investing" element={<Investing />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<PersistLogin />}>
            <Route element={<PrivateRoute />}>
              <Route path="/watchlater" element={<WatchLater />} />
              <Route path="/playlist" element={<Playlist />} />
            </Route>
          </Route>
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </div>
      <Toast />
    </>
  );
};
