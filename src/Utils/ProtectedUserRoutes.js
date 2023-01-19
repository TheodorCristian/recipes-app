import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedUserRoutes = ({ redirectPath, children }) => {
  const [user, setUser] = useState(
    sessionStorage.getItem("user") !== "null" ? true : false
  );

  return !!user ? children : <Navigate to={redirectPath} />;
};

export default ProtectedUserRoutes;
