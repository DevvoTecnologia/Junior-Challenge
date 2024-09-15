import { Navigate } from "react-router-dom";

import React, { FC } from "react";

interface IPublicRoute {
  children: React.ReactNode;
}

export const PublicRoute: FC<IPublicRoute> = ({ children }) => {
  //   const { token } = useAuthUser();

  //   if (token) {
  //     return <Navigate to="/rings/list" />;
  //   }

  return children;
};
