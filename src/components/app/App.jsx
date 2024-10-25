import Home from "../home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: "/reports",
    element: <WeatherForecastChart />
  }
]);

export default function App() {
  return <RouterProvider router={router}/>
}
