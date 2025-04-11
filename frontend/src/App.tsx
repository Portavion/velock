import "./App.css";

import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import { useRetrieveJWT } from "./utils/retrieveJWT.tsx";
import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext.ts";

function App() {
  const jwtToken = useRetrieveJWT();

  const [activeList, setActiveList] = useState<BikePointList | undefined>();

  if (jwtToken === "") {
    return <Login />;
  }

  return (
    <AuthContext.Provider value={jwtToken}>
      <Home activeList={activeList} setActiveList={setActiveList} />
    </AuthContext.Provider>
  );
}

export default App;
