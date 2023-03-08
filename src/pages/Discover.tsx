import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import supabase from "../supabase";
import useAuth from "../utils/useAuth";

function Discover() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signout = async () => {
    await supabase.auth.signOut();
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Discover</h1>
      <BackButton handleClick={signout} />
    </div>
  );
}

export default Discover;
