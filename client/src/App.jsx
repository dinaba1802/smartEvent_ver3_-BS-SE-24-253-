import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddEvent,
  Stats,
  AllEvents,
  Profile,
  Admin,
  Chat,
  EditEvent,
} from "./pages";
import BusinessPage from "./pages/BusinessPage";
import BusinessEventRequests from "./pages/BusinessEventRequests";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddEvent />,
          },
          {
            path: "edit-business",
            element: <EditEvent />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "event-requests",
            element: <BusinessEventRequests />,
          },
          {
            path: "all-events",
            element: <AllEvents />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "business/:businessId",
            element: <BusinessPage />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
