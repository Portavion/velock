import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitLogin(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const body =
      encodeURIComponent("email") +
      "=" +
      encodeURIComponent(email) +
      "&" +
      encodeURIComponent("password") +
      "=" +
      encodeURIComponent(password);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("jwt-token", data.token);
          setEmail("");
          setPassword("");
          window.location.reload();
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden">
        <div className="">
          <form onSubmit={submitLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  className="flex h-9 w-60 rounded-md border border-input bg-teal-900 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
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
              <button type="submit" className="w-15 h-9 bg-teal-700">
                Login
              </button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
