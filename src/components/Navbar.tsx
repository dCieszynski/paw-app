import React from "react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

type Props = {
  links: { to: string; Icon: IconType }[];
};

function Navbar({ links }: Props) {
  const location = useLocation();

  return (
    <nav className="flex justify-center items-center w-screen text-input-grey bg-input-grey-2 h-12 fixed bottom-0">
      <ul className="flex justify-around w-[300px]">
        {links.map(({ to, Icon }) => (
          <li key={to} className="relative">
            {location.pathname === to && <div className="absolute w-10 h-1 top-[-16px] left-1/2 translate-x-[-50%] bg-paw-green-2" />}
            <Link to={to} className="text-2xl">
              <Icon />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
