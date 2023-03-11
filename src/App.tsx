import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import AddPet from "./pages/AddPet";
import CreateProfile from "./pages/CreateProfile";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import OTPSignin from "./pages/OTPSignin";
import PickRole from "./pages/PickRole";
import ShelterMain from "./pages/ShelterMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/sign_via_otp" element={<OTPSignin />} />
        <Route path="/create_profile" element={<PickRole />} />
        <Route path="/create_profile/:role" element={<CreateProfile />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/animal_shelter" element={<ShelterMain />} />
        <Route path="/add_pet" element={<AddPet />} />
      </Route>
    </Routes>
  );
}

export default App;
