import "./App.css";

import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import { useRetrieveJWT } from "./utils/retrieveJWT.tsx";
import { useState } from "react";

function App() {
  const jwtToken = useRetrieveJWT();
  const [activeList, setActiveList] = useState<BikePointList | undefined>();

  if (jwtToken === "") {
    return <Login />;
  }

  return <Home activeList={activeList} setActiveList={setActiveList} />;
}

export default App;
