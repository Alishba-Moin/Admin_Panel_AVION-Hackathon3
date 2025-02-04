"use client";

// import React from 'react'
// import {Menu} from 'lucide-react';

// function Header({ toggleSidebar}: any) {
//   return (
//     <section className="flex items-center gap-3 bg-white border-b px-4 py-4">
//         <div className="block md:hidden">
//             <button  onClick={toggleSidebar}>
//                 <Menu/>
//             </button>
//         </div>
//         <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">
//         <h1 className="text-xl font-semibold">Dashboard</h1>
//         </div>
//     </section>
//   )
// }

// export default Header

"use client";

import React from "react";
import { Menu } from "lucide-react";

function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="flex items-center gap-3 bg-white border-b px-4 py-4 w-full">
      <button className="block md:hidden" onClick={toggleSidebar}>
        <Menu />
      </button>
    </header>
  );
}

export default Header;
