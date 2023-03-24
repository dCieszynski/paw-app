import React from "react";

import BackButton from "../components/BackButton";
import ProfileForm from "../components/ProfileForm";

function CreateProfile() {
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
