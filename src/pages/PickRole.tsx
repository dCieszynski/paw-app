import React, { useState } from "react";
import LoginSubmitButton from "../components/LoginSubmitButton";
import RolePicker from "../components/RolePicker";
import { TRole } from "../types/login";

function PickRole() {
  const [role, setRole] = useState<TRole>("Animal shelter");

  return (
    <div className="flex flex-col items-center gap-36">
      <RolePicker activeRole={role} setActiveRole={setRole} />
      <LoginSubmitButton title="Continue" submit={false} link={`/create_profile/${role.toLowerCase()}`} />
    </div>
  );
}

export default PickRole;
