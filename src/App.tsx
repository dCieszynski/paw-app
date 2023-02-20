import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import CreateProfile from "./pages/CreateProfile";
import Login from "./pages/Login";
import PickRole from "./pages/PickRole";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="create_profile" element={<PickRole />} />
        <Route path="create_profile/:role" element={<CreateProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
