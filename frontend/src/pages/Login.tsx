import velockLogo from "../assets/velock-logo.png";
import { LoginForm } from "../features/auth/";

function LoginPage() {
  return (
    <>
      <div>
        <img src={velockLogo} className="logo" alt="Velock logo" />
      </div>

      <div className="card">
        <LoginForm></LoginForm>
        <p className="smallText">
          Don't have an account?
          <br />
          <a href="/signup">Signup</a>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
