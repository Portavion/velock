import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  function submitNewUser(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users`, {
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
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden">
        <div className="">
          <form onSubmit={submitNewUser} className="p-6 md:p-8">
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Signup</h1>
              </div>
              <div className="grid gap-2">
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="John"
                  className="flex h-9 w-60 rounded-md border border-input bg-teal-900 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@gmail.com"
                  className="flex h-9 w-60 rounded-md border border-input bg-teal-900 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="flex h-9 w-60 rounded-md border border-input bg-teal-900 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  className="flex h-9 w-60 rounded-md border border-input bg-teal-900 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-20 h-9 bg-teal-700">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { SignupForm };
