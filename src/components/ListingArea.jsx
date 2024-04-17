import "./ListingArea.css";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";

import { SignUp } from "./SignUp";
// import { Home } from "./Home";

export const ListingArea = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}

        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      {/* <div className="listing-div">
        <h1>welcome to video listing</h1>
      </div> */}
    </>
  );
};
