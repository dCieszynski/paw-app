import { AiFillHeart } from "react-icons/ai";
import { BsFillChatTextFill, BsFillPersonFill } from "react-icons/bs";
import { MdDomain, MdPets } from "react-icons/md";
import { TbLayoutCards } from "react-icons/tb";

export const keeperLinks = [
  {
    to: "/keeper",
    Icon: TbLayoutCards,
  },
  {
    to: "likes",
    Icon: AiFillHeart,
  },
  {
    to: "messages",
    Icon: BsFillChatTextFill,
  },
  {
    to: "profile/keeper",
    Icon: BsFillPersonFill,
  },
];

export const shelterLinks = [
  {
    to: "/animal_shelter",
    Icon: MdDomain,
  },
  {
    to: "add_pet",
    Icon: MdPets,
  },
  {
    to: "messages",
    Icon: BsFillChatTextFill,
  },
  {
    to: "profile/animal_shelter",
    Icon: BsFillPersonFill,
  },
];
