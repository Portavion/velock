import { useEffect, useState } from "react";

function useRetrieveJWT() {
  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (jwtToken !== "") {
        const isTokenValidResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/auth/isTokenValid`,
          {
            method: "GET",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        );
        if (isTokenValidResponse.status === 200) {
          return true;
        } else {
          localStorage.removeItem("jwt-token");
          window.location.reload();
          return false;
        }
      }
    };
    setJwtToken(localStorage.getItem("jwt-token") || "");
    if (!checkTokenExpiry()) {
      console.log("invalid token");
    }
  }, [jwtToken]);
  return jwtToken;
}

export { useRetrieveJWT };
