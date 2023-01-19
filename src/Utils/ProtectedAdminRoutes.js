import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoutes = ({ redirectPath, children }) => {
  const [user, setUser] = useState(
    !!sessionStorage.getItem("user") ? true : false
  );

  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("isAdmin") === 'true' ? true : false
  );
  useEffect(() => {
    console.log(user, isAdmin);
  }, []);

  return !!user && isAdmin ? children : <Navigate to={redirectPath} />;
};

export default ProtectedAdminRoutes;
