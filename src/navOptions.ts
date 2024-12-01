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
];
