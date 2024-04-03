import { Login } from "./components/Login";

import { Routes, Route } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { TopNavBar } from "./components/TopNavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TopNavBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
