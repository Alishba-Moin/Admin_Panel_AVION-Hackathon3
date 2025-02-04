"use client";

import {
  Layers2,
  LayoutDashboard,
  LogOut,
  PackageOpen,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Define the type for menu items
interface MenuItem {
  name: string;
  link: string;
  icon: JSX.Element;
  isLogout?: boolean
}

export default function Sidebar() {
  const router = useRouter(); // Get the router instance

  const menuList: MenuItem[] = [
    {
      name: "Dashboard",
      link: "/Admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      link: "/Admin/Products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      name: "Categories",
      link: "/Admin/Categories",
      icon: <Layers2 className="h-5 w-5" />,
    },
    {
      name: "Orders",
      link: "/Admin/Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Customers",
      link: "/Admin/Customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      // This is the logout button item
      name: "Logout",
      link: "",
      icon: <LogOut className="h-5 w-5" />,
      isLogout: true, // Custom flag to handle logout button separately
    },
  ];

  // Handle Logout with localStorage
  const handleLogout = () => {
    // Remove user data from localStorage on logout
    localStorage.removeItem("user"); // Replace 'user' with your key
    // Redirect to login page after logout
    router.push("/Login"); 
  };

  return (
    <section className="sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50">
      <div className="flex justify-center py-4">
        <Link href={`/`}>
          <h1 className="font-extrabold text-5xl text-[#2A254B]">Avion</h1>
        </Link>
      </div>
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
        {menuList?.map((item, key) => {
          if (item.isLogout) {
            // Render the logout button
            return (
              <div className="flex justify-center" key={key}>
                <button
                  onClick={handleLogout} // Calling the logout handler
                  className="flex gap-2 items-center px-8 py-11 w-full justify-center ease-soft-spring duration-400 transition-all text-[#2A254B]"
                >
                  {item.icon} {item.name}
                </button>
              </div>
            );
          }
          return <Tab item={item} key={key} />;
        })}
      </ul>
    </section>
  );
}

// Pass the defined type as a prop to the Tab component
function Tab({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;
  return (
    <Link href={item?.link}>
      <li
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
        ${isSelected ? "bg-[#2A254B] text-white" : "bg-white text-[#2A254B]"} 
        `}
      >
        {item?.icon} {item?.name}
      </li>
    </Link>
  );
}
