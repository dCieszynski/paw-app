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
import Animal from "./pages/Animal";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<Login />} />
        <Route path="sign_via_otp" element={<OTPSignin />} />
        <Route path="create_profile" element={<PickRole />} />
        <Route path="create_profile/:role" element={<CreateProfile />} />
        <Route element={<ProtectedRoute allowedRole="animal_shelter" />}>
          <Route path="animal_shelter" element={<AppLayout links={shelterLinks} />}>
            <Route path="" element={<ShelterMain />} />
            <Route path="add_pet" element={<AddPet />} />
            <Route path="messages" element={<Messages />} />
            <Route path="details/:id" element={<Animal />} />
            <Route path="edit/:id" element={<AddPet />} />
            <Route path="profile/:role" element={<CreateProfile />} />
            <Route path="messages/chat/:id" element={<Chat />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRole="keeper" />}>
          <Route path="keeper" element={<AppLayout links={keeperLinks} />}>
            <Route path="" element={<Discover />} />
            <Route path="likes" element={<Likes />} />
            <Route path="profile/:role" element={<CreateProfile />} />
            <Route path="messages" element={<Chats />} />
            <Route path="messages/chat/:id" element={<Chat />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
