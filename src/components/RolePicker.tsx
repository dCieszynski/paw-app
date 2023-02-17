import React from "react";
import { TRole } from "../types/login";
import RoleOption from "./RoleOption";

type Props = {
  activeRole: TRole;
  setActiveRole: React.Dispatch<React.SetStateAction<TRole>>;
};

const roles = ["Keeper", "Animal shelter"];

function RolePicker({ activeRole, setActiveRole }: Props) {
  return (
    <div className="flex flex-col gap-20">
      <h1 className="font-montserrat-bold text-[34px]">I am a</h1>
      <div className="flex flex-col items-start gap-3">
        {roles.map((role) => (
          <RoleOption key={role} text={role} active={activeRole === role} onClick={() => setActiveRole(role as TRole)} />
        ))}
      </div>
    </div>
  );
}

export default RolePicker;
