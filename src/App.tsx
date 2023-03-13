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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/sign_via_otp" element={<OTPSignin />} />
        <Route path="/create_profile" element={<PickRole />} />
        <Route path="/create_profile/:role" element={<CreateProfile />} />
        <Route element={<ProtectedRoute allowedRole="animal_shelter" />}>
          <Route path="/animal_shelter" element={<ShelterMain />} />
          <Route path="/add_pet" element={<AddPet />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="keeper" />}>
          <Route path="/discover" element={<Discover />} />
          <Route path="/likes" element={<Likes />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
