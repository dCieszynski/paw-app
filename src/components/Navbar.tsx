import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillChatTextFill, BsFillPersonFill } from "react-icons/bs";
import { TbLayoutCards } from "react-icons/tb";
import { Link } from "react-router-dom";

const links = [
  {
    to: "/discover",
    Icon: TbLayoutCards,
  },
  {
    to: "/likes",
    Icon: AiFillHeart,
  },
  {
    to: "/messages",
    Icon: BsFillChatTextFill,
  },
  {
    to: "/profile",
    Icon: BsFillPersonFill,
  },
];

function Navbar() {
  return (
    <nav className="flex justify-center items-center w-screen text-input-grey bg-input-grey-2 h-12 fixed bottom-0">
      <ul className="flex justify-around w-[300px]">
        {links.map(({ to, Icon }) => (
          <li key={to}>
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