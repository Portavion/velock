import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

import { SignupForm } from "./features/auth/SignupForm/SignupForm.tsx";
import { LoginForm } from "./features/auth/LoginForm/LoginForm.tsx";
import { SearchResults } from "./pages/SeachResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "signup",
    element: <SignupForm />,
  },
  // { path: "search/:address", element: <SearchResults /> },
  { path: "search/:address", element: <SearchResults /> },
  { path: "search", element: <SearchResults /> },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
