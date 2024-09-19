import { Maybe } from "./../../../common/types/Maybe";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { iLoggedUser } from "./mutations/useMutationLogin";

export default function useUser() {
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token) as Maybe<
        Omit<iLoggedUser, "token">
      >;

      if (
        decodedToken &&
        typeof decodedToken === "object" &&
        "email" in decodedToken
      ) {
        setUserEmail(decodedToken.email);
      }
    }
  }, []);

  return { userEmail };
}
