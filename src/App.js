import "./assets/css/plugins/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "./App.css";
import Router from "./Router/routes";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App overflow-hidden">
      <Router />
    </div>
  );
}

export default App;
