"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/app/components/Sidebar/page";

const ConditionalSideBar = () => {
  const pathname = usePathname();


  if (pathname === "/Login") {
    return null;
  }
  if (pathname === "/") {
    return null;
  }

  return <SideBar />;
};

export default ConditionalSideBar;