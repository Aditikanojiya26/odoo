
import Features from "../pages/Features";
import Home from "../pages/Home";
import WorkFlow from "../pages/WorkFlow";
import Pricing from "../pages/Pricing";
import Testimonials from "../pages/Testimonials";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { createBrowserRouter } from "react-router";
import AddItemPage from "../components/Additem"; 
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/features",
        element: <Features/>,
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
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-item", // ⬅️ New protected route
    element: (
      <ProtectedRoute>
        <AddItemPage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
