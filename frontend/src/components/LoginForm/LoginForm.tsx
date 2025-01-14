import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function submitLogin(event: any): void {
    event.preventDefault();

    fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("jwt-token", data.token);
          console.log(data.token);
          setEmail("");
          setPassword("");
          navigate("/");
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <>
      <form onSubmit={submitLogin}>
        <div className={styles.formSection}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            required
          />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginForm;
