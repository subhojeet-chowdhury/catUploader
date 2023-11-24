import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CatList from "./routes/CatList";
import UploadCat from "./routes/UploadCat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CatList />,
  },
  {
    path: "/upload",
    element: <UploadCat />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
