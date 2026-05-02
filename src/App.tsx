import Dashboard from "./components/Dashboard/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router";
import Overlay from "./pages/Overlay";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/overlay",
    Component: Overlay,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
