import "./App.css";
// import { useState, useEffect } from "react";

import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import { useRetrieveJWT } from "./utils/retrieveJWT.tsx";

function App() {
  const jwtToken = useRetrieveJWT();

  if (jwtToken === "") {
    return <Login />;
  }

  return <Home />;
}

export default App;
