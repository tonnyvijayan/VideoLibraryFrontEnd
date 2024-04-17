// import { Login } from "./components/Login";

// import { Routes, Route } from "react-router-dom";
// import { SignUp } from "./components/SignUp";
// import { Home } from "./components/Home";
import { TopNavBar } from "./components/TopNavBar";
import { SideNavBar } from "./components/SideNavBar";
import { ListingArea } from "./components/ListingArea";
import "./App.css";

function App() {
  return (
    <>
      <div className="main-page">
        <TopNavBar />
        <SideNavBar />
        <ListingArea />
      </div>
    </>
  );
}

export default App;
