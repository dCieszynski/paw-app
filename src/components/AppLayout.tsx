import React from "react";
import { IconType } from "react-icons";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

type Props = {
  links: { to: string; Icon: IconType }[];
};

function AppLayout({ links }: Props) {
  return (
    <div className="flex flex-col items-center gap-5 h-full">
      <Outlet />
      <Navbar links={links} />
    </div>
  );
}

export default AppLayout;
