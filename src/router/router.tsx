import { DashboardPage, ProductPage, ProfilePage } from "@/components/page";
import LoginPage from "@/components/page/Login";
import { EdithProductPage } from "@/components/page/product/EdithProduct";
import App from "@/components/template/App";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "product/:id",
        element: <EdithProductPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
