import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { AppRoutes } from "./AppRoutes";
import "./App.scss";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(AppRoutes()));

  return <RouterProvider router={router} />;
}

export default App;
