import { DashboardPage, ProductPage, ProfilePage } from "@/components/page";
import { EntryManagement } from "@/components/entry/EntryManagment";
import LoginPage from "@/components/page/Login";
import { EdithOfficePage } from "@/components/page/office/EdithOffice";
import { OfficePage } from "@/components/page/office/OfficeList";
import { EdithProductPage } from "@/components/page/product/EdithProduct";
import { EdithUserPage } from "@/components/page/user/UserEdith";
import App from "@/components/template/App";
import { createBrowserRouter } from "react-router-dom";
import { EntryPage } from "@/components/entry/EntryList";
import { UserPage } from "@/components/page/user/UserList";

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
        path: "office",
        element: <OfficePage />,
      },
      {
        path: "office/:id",
        element: <EdithOfficePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "user/:id",
        element: <EdithUserPage />,
      },
      {
        path: "entry",
        element: <EntryPage />,
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
