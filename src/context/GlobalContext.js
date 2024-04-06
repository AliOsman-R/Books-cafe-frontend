import { createContext, useState, useEffect } from "react";
import { httpRequest } from "../utils/httpsRequest";

export const Context = createContext({});

export default function GlobalContext() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const actions = (action) => {
    const { type, payload } = action;

    switch (type) {
      case "SET_LOADING":
        return setLoading(payload);
      case "SET_USER":
        return setUser(payload);
      case "SET_IS_AUTH":
        return setIsAuth(payload);
      default:
        return loading;
    }
  };

  useEffect(() => {
    httpRequest
      .get("/auth/is-user-auth")
      .then((res) => {
        if (res.data.auth) {
          setUser(res.data.user);
        }
        setIsAuth(res.data.auth);
        console.log("res: ", res);
      })
      .catch((err) => {
        setUser({});
        setIsAuth(false);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { actions, loading, user, isAuth };
}
