import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddPet from "./pages/AddPet";
import CreateProfile from "./pages/CreateProfile";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import OTPSignin from "./pages/OTPSignin";
import PickRole from "./pages/PickRole";
import ShelterMain from "./pages/ShelterMain";
import Likes from "./pages/Likes";
import Messages from "./pages/Messages";
import AppLayout from "./components/AppLayout";
import { keeperLinks, shelterLinks } from "./utils/navbarLinks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/sign_via_otp" element={<OTPSignin />} />
        <Route path="/create_profile" element={<PickRole />} />
        <Route path="/create_profile/:role" element={<CreateProfile />} />
        <Route element={<ProtectedRoute allowedRole="animal_shelter" />}>
          <Route path="animal_shelter" element={<AppLayout links={shelterLinks} />}>
            <Route path="" element={<ShelterMain />} />
            <Route path="/animal_shelter/add_pet" element={<AddPet />} />
            <Route path="/animal_shelter/messages" element={<Messages />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole="keeper" />}>
          <Route path="keeper" element={<AppLayout links={keeperLinks} />}>
            <Route path="" element={<Discover />} />
            <Route path="/keeper/likes" element={<Likes />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
