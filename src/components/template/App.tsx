import { Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useProfile } from "@/hooks/useAuth";
import { navOptions } from "@/navOptions";
import { Toaster } from "sonner";

export default function App() {
  const { role, id } = useAuthStore();
  const { data } = useProfile(id as string);

  const filteredOptionsNav = navOptions.filter(
    (option) => role && option.allowedRoles.includes(role)
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">Cabanilla Demo</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 ">
          <ul className="space-y-2">
            {filteredOptionsNav.map((option) => (
              <li key={option.path}>
                <NavLink
                  to={option.path}
                  className={({ isActive, isPending }) =>
                    `flex items-center gap-2 w-full h-10 px-2 rounded-lg text-lg font-semibold cursor-pointer ${
                      isPending
                        ? "pending"
                        : isActive
                        ? "bg-accent"
                        : "hover:bg-accent"
                    }`
                  }
                  end
                >
                  <option.icon />
                  {option.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <div className="flex flex-col items-center space-y-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-medium">
              {`${data?.name} ${data?.lastname}`}
            </div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
          <div className="flex justify-center space-x-2 my-6">
            <Link to={"/app/profile"} className="border-2 p-2 rounded-lg">
              <Settings></Settings>
            </Link>
            <Link to={"/login"} className="border-2 p-2 rounded-lg">
              <LogOut></LogOut>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="flex items-center justify-end p-4">
            <div className="flex items-center space-x-4">
              {/* <div className="w-96">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full"
                />
              </div> */}
              <Button size="icon" variant="ghost">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <Outlet />
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-400 text-white",
            success: "bg-green-400 text-white",
            warning: "text-yellow-400",
            info: "bg-blue-400",
            loading: "bg-blue-400 text-white",
          },
        }}
      />
    </div>
  );
}

// interface NavItemProps {
//   href: string;
//   icon: React.ElementType;
//   children: React.ReactNode;
//   active?: boolean;
// }

// function NavItem({ href, icon: Icon, children, active }: NavItemProps) {
//   return (
//     <Link
//       to={href}
//       className={cn(
//         "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
//         active ? "bg-secondary" : "hover:bg-secondary/50"
//       )}
//     >
//       <Icon className="w-5 h-5" />
//       <span>{children}</span>
//     </Link>
//   );
// }
