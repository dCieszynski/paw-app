import React from "react";

import BackButton from "../components/BackButton";
import ProfileForm from "../components/ProfileForm";
import useAuth from "../utils/useAuth";

function CreateProfile() {
  const { profile } = useAuth();

  if (profile === null) {
    return (
      <div className="flex flex-col items-center gap-5 h-full">
        <div className="w-full">
          <BackButton />
        </div>
        <div className="w-[300px]">
          <ProfileForm />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <BackButton />
      </div>
      <div className="w-[300px]">
        <ProfileForm />
      </div>
    </>
  );
}

export default CreateProfile;
