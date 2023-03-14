import React, { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import supabase from "../supabase";
import { TUserProfile } from "../types/login";
import Loader from "../components/Loader";

export type TAuthContext = {
  auth: User | null;
  profile: TUserProfile | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext>({
  auth: null,
  profile: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profile, setProfile] = useState<TUserProfile | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = (user: User) => {
    setAuth(user);
  };

  const logout = () => {
    setAuth(null);
    setProfile(null);
  };

  const authValue: TAuthContext = useMemo(
    () => ({
      auth,
      profile,
      login,
      logout,
    }),
    [auth, profile]
  );

  const checkUser = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    if (location.pathname === "/sign_via_otp") {
      setIsProfileLoading(false);
      setIsAuthLoading(false);
      return;
    }
    if (data.session?.user) {
      login(data.session.user);
    } else {
      logout();
      navigate("/");
    }
    setIsAuthLoading(false);
  }, [navigate, location.pathname]);

  const checkProfile = useCallback(async () => {
    if (!auth) {
      setIsProfileLoading(false);
      return;
    }
    const { data: shelterData } = await supabase.from("shelters").select("*").eq("user_id", auth.id);
    if (shelterData && shelterData.length > 0) {
      setProfile(shelterData[0]);
    } else {
      const { data: keeperData } = await supabase.from("keepers").select("*").eq("user_id", auth.id);
      if (keeperData && keeperData.length > 0) {
        setProfile(keeperData[0]);
      }
    }
    setIsProfileLoading(false);
  }, [auth]);

  useEffect(() => {
    setIsAuthLoading(true);
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    setIsProfileLoading(true);
    checkProfile();
  }, [checkProfile]);

  return <div>{isAuthLoading || isProfileLoading ? <Loader /> : <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>}</div>;
}

export default AuthContext;
