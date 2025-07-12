
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Features from "../pages/Features";
import WorkFlow from "../pages/WorkFlow";
import Pricing from "../pages/Pricing";
import Testimonials from "../pages/Testimonials";
import Signup from "../components/Signup";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../components/Dashboard";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/workflow",
        element: <WorkFlow />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
    ],
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard  />
      </ProtectedRoute>
    ),
  },
]);


export default router;
