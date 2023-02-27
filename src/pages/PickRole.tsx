import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../components/BackButton";
import LoginSubmitButton from "../components/LoginSubmitButton";
import RolePicker from "../components/RolePicker";
import supabase from "../supabase";
import { TRole } from "../types/login";
import useAuth from "../utils/useAuth";

function PickRole() {
  const [role, setRole] = useState<TRole>("Animal shelter");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-36">
      <div className="self-start">
        <BackButton handleClick={signout} />
      </div>
      <RolePicker activeRole={role} setActiveRole={setRole} />
      <LoginSubmitButton title="Continue" submit={false} link={`/create_profile/${role.toLowerCase()}`} />
    </div>
  );
}

export default PickRole;
