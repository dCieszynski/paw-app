import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../components/BackButton";
import LoginSubmitButton from "../components/LoginSubmitButton";
import RolePicker from "../components/RolePicker";
import supabase from "../supabase";
import { TRole } from "../types/login";
import useAuth from "../utils/useAuth";

function PickRole() {
  const [role, setRole] = useState<TRole>("Animal shelter");
  const { auth, profile, logout } = useAuth();
  const navigate = useNavigate();

  const signout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate("/");
  };

  const getProfile = useCallback(async () => {
    if (!auth || !profile) return;
    if (profile.role === "animal_shelter") {
      navigate("/animal_shelter");
    } else if (profile.role === "keeper") {
      navigate("/keeper");
    }
  }, [auth, profile, navigate]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="flex flex-col items-center gap-36">
      <div className="self-start">
        <BackButton handleClick={signout} />
      </div>
      <RolePicker activeRole={role} setActiveRole={setRole} />
      <LoginSubmitButton title="Continue" submit={false} link={`/create_profile/${role.split(" ").join("_").toLowerCase()}`} />
    </div>
  );
}

export default PickRole;
