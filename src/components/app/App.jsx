import Home from "../home";
import Signin from "../siginin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersTable from "../Table";
import WeatherForecastChart from "../dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/users",
    element: <UsersTable />
  },
  {
    path: "/reports",
    element: <WeatherForecastChart />
  }
]);

export default function App() {
  return <RouterProvider router={router}/>
}
