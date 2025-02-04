"use client";

// import { usePathname } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import SideBar from "@/app/components/Sidebar/page";
// import Header from "../Header";

// const ConditionalSideBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement | null>(null); // Correctly specify type

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   if (pathname === "/Login") {
//     return null;
//   }
//   if (pathname === "/") {
//     return null;
//   }

//   useEffect(() => {
//     toggleSidebar();
//   }, [pathname]);

//   useEffect(() => {
//     function handleClickOutsideEvent(event: MouseEvent) {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutsideEvent);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutsideEvent);
//     };
//   }, []);

//   return (
//     <main className="relative flex">
//       {/* Sidebar for larger screens */}
//       <div className="hidden md:block ease-in-out transition-all duration-400">
//         <SideBar />
//       </div>

//       {/* Sidebar for smaller screens */}
//       <div
//         ref={sidebarRef} // Attach ref here
//         className={`fixed block md:hidden ${
//           isOpen ? "translate-x-0" : "-translate-x-[260px]"
//         }`}
//       >
//         <SideBar />
//       </div>

//       {/* Header and content */}
//       <section className="flex-1 flex flex-col min-h-screen">
//         <Header toggleSidebar={toggleSidebar} />
//       </section>
//     </main>
//   );
// };

// export default ConditionalSideBar;

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SideBar from "@/app/components/Sidebar/page";
import Header from "../Header";

const ConditionalSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Correctly specify type

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (pathname === "/Login" || pathname === "/") {
    return null;
  }

  useEffect(() => {
    toggleSidebar();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutsideEvent(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <SideBar />
      </div>

      {/* Sidebar for smaller screens */}
      <div
        ref={sidebarRef}
        className={`fixed block md:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}`}
      >
        <SideBar />
      </div>

      {/* Header and content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4"> {/* Ensure this takes full width */}
          {/* Children content will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default ConditionalSideBar;
