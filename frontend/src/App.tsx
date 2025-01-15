// import velockLogo from "/velock-logo.png";
import velockLogo from "../public/velock-logo.png";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <img src={velockLogo} className="logo" alt="Velock logo" />
      </div>

      <h2>Velock</h2>

      <div className="card">
        <p>
          <a href="/login">Login</a>
        </p>
        <p className="smallText">
          Don't have an account?
          <br />
          <a href="/signup">Signup</a>
        </p>
      </div>
    </>
  );
}

export default App;
