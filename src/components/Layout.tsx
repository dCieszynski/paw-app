import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-full">
      <div className="w-full min-h-screen p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
