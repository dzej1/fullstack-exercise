import { useLocalStorage } from "usehooks-ts";
import axios from "axios";
import { LoginFormType } from "../types";
import { useMemo, useEffect } from "react";
import { JwtPayloadType } from "../types";
import { useLocation } from "react-router";

axios.defaults.baseURL = "http://localhost:3333/";

const parseUserFromJwt = (token: string | null) => {
  if (token == null) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};
export const useUser = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useLocalStorage("access_token", null);
  const [refreshToken, setRefreshToken] = useLocalStorage(
    "refresh_token",
    null
  );
  const [user, setUser]: [JwtPayloadType | null, Function] = useLocalStorage(
    "user",
    parseUserFromJwt(accessToken)
  );

  const [isLogged, isAdmin] = useMemo(() => {
    if (!user) return [false, false];

    const tokenExpiry = new Date(user.exp * 1000);

    return [new Date() <= tokenExpiry, user.role === "admin"];
  }, [user, location]);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common = {
        Authorization: `bearer ${accessToken}`,
      };
    }
  }, [accessToken]);

  const login = ({ username, password }: LoginFormType) => {
    axios.post("auth/login", { username, password }).then((data) => {
      const accessToken = data.data?.access_token;
      const refreshToken = data.data?.refresh_token;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(parseUserFromJwt(accessToken));
    });
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
  };

  const refresh = () => {
    axios
      .post(
        "auth/refreshToken",
        {},
        { headers: { Authorization: "Bearer " + refreshToken } }
      )
      .then((data) => {
        const accessToken = data.data?.access_token;
        const refreshToken = data.data?.refresh_token;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(parseUserFromJwt(accessToken));
      });
  };
  return {
    login,
    logout,
    refresh,
    isLogged,
    isAdmin,
    username: user?.username,
  };
};
