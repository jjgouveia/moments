import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterProvider from "../context/createUser/register.provider";
import FeedView from "../pages/Feed/FeedView";
import LoginView from "../pages/Login/LoginView";
import MomentDetailsView from "../pages/MomentDetails/MomentDetailsView";
import Profile from "../pages/Profile";
import Users from "../pages/Users";
import ErrorBoundary from "../services/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <FeedView /> },
      { path: "/moment/:id", element: <MomentDetailsView /> },
      { path: "/profile", element: <Profile /> },
      { path: "/users", element: <Users /> },
    ],
  },
  {
    path: "/login",
    element: (
      <RegisterProvider>
        <LoginView />
      </RegisterProvider>
    ),
  },
]);

export default router;
