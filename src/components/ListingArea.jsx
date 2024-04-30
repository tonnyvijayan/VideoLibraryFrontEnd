import "./ListingArea.css";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";
import { VideoHome } from "./VideoHome/VideoHome";

import { SignUp } from "./SignUp";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
// import { Home } from "./Home";

export const ListingArea = () => {
  return (
    <>
      <div className="listing-div">
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<VideoHome />} />
          <Route path="/videos/:videoId" element={<VideoPlayer />} />
        </Routes>
      </div>
    </>
  );
};
