import { ReactNode } from "react";
import { LayoutDashboard } from "lucide-react";

interface NavOption {
  path: string;
  name: string;
  icon: ReactNode;
  allowedRoles: string[];
}

export const navOptions = [
  {
    path: "/app",
    name: "Dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/app/product",
    name: "Product",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/app/office",
    name: "Office",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/app/user",
    name: "User",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/app/entry",
    name: "Entry",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/app/exit",
    name: "Exit",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/app/loan",
    name: "Loan",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
  {
    path: "/app/return",
    name: "Return",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
];
