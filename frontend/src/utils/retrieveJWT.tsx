import { useEffect, useState } from "react";

function useRetrieveJWT() {
  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    setJwtToken(localStorage.getItem("jwt-token") || "");
  }, [jwtToken]);
  return jwtToken;
}

export { useRetrieveJWT };
