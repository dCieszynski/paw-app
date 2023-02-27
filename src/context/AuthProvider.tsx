import React, { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import supabase from "../supabase";

export type TAuthContext = {
  auth: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext>({
  auth: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (user: User) => {
    setAuth(user);
  };

  const logout = () => {
    setAuth(null);
  };

  const authValue: TAuthContext = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  const checkUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      login(data.session.user);
    } else {
      logout();
      navigate("/");
    }
  };

  useEffect(() => {
    checkUser();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export default AuthContext;
