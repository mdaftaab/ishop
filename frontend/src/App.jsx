
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from "./Components/Admin/Index";
import Home from "./Pages/Website/Index";
import Dashboard from "./Pages/Admin/Dashboard";
import AddCategory from "./Pages/Admin/Category/Add";
import EditCategory from "./Pages/Admin/Category/Edit";
import ViewCategory from "./Pages/Admin/Category/View";
import AddProduct from "./Pages/Admin/Product/Add";
import ViewProduct from "./Pages/Admin/Category/View";
import ContextHolder from "./Context/ContextHolder";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "category",
        element: <ViewCategory />
      },
      {
        path: "category/add/",
        element: <AddCategory />
      },
      {
        path: "category/edit/:id",
        element: <EditCategory />
      },
      {
        path: "product/add",
        element: <AddProduct />
      },
      {
        path: "product/",
        element: <ViewProduct />
      }
    ]
  }
]);
function App() {
  return (
    <ContextHolder>
      {/* Group of Admin */}
      <RouterProvider router={router} />
      {/* Group of Website */}
    </ContextHolder>
  );
}

export default App;
