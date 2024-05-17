import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Modals from "./pages/modals";
import { BookProvider } from "./contexts/bookContext";
import Graph from "./pages/graph";
import Mission from "./pages/mission";
import Library from "./pages/library";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/modals",
    element: <Modals />,
  },
  {
    path: "/graph",
    element: <Graph />,
  },
  {
    path: "/mission",
    element: <Mission />,
  },
  {
    path: "/library",
    element: <Library />,
  },
]);

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <BookProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </BookProvider>,
  );
});
