import Features from "../pages/Features";
import Home from "../pages/Home";
import WorkFlow from "../pages/WorkFlow";
import Pricing from "../pages/Pricing";
import Testimonials from "../pages/Testimonials";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import AddItemPage from "../components/Additem";
import ItemsList from "../pages/ItemsList";
import SingleItem from "../pages/SingleItem";
import MainLayout from "../layout/MainLayout";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/features", element: <Features /> },
      { path: "/workflow", element: <WorkFlow /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/testimonials", element: <Testimonials /> },

      // ✅ Public item routes
      { path: "/items", element: <ItemsList /> },
      { path: "/items/:id", element: <SingleItem /> },
    ],
  },
  { path: "/signin", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-item",
    element: (
      <ProtectedRoute>
        <AddItemPage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
