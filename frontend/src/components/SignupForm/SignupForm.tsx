import styles from "./SignupForm.module.css";

function SignupForm() {
  return (
    <>
      <form action="http://localhost:3000/api/v1/users" method="POST">
        <div className={styles.formSection}>
          <label htmlFor="username">Username:</label>
          <br />
          <input type="text" name="username" id="username" required />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" name="email" id="email" required />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" name="password" id="password" required />
        </div>
        <div className={styles.formSection}>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <br />
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignupForm;
