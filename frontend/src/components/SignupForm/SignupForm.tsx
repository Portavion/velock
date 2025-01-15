import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  function submitNewUser(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password, passwordConfirmation }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordConfirmation("");
          navigate("/");
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <>
      <form onSubmit={submitNewUser}>
        <div className={styles.formSection}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className={styles.formSection}>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <br />
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignupForm;
