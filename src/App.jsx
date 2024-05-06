// import { Login } from "./components/Login";

// import { Routes, Route } from "react-router-dom";
// import { SignUp } from "./components/SignUp";
// import { Home } from "./components/Home";
import { TopNavBar } from "./components/Home/TopNavBar";
import { SideNavBar } from "./components/Home/SideNavBar";
import { ListingArea } from "./components/Home/ListingArea";
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
