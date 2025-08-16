"use client";
import GetUserApi from "@/apis/user/GetUserApi";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const initialState = {
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      //console.log("Setting user:", action.payload);
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isPublicPage = [
    "/",
    "/copilot",
    "/job-tracker",
    "/resume-builder",
  ].includes(pathname);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      if (isPublicPage) {
        if (token) {
          try {
            const data = await GetUserApi(token);
            dispatch({ type: "SET_USER", payload: data });
          } catch (error) {
            //console.log("Error fetching user data:", error);
          }
        }
        setReady(true);
        setLoading(false);
        return;
      }

      setLoading(true);

      // If there's a token, fetch user data and handle redirects
      if (token) {
        try {
          const data = await GetUserApi(token);
          if (!data) {
            //console.log("User not found. Redirecting to login.");
            router.push("/auth/sign-in");
            setReady(true);
            setLoading(false);
            return;
          }
          //console.log(data, "User data fetched");
          dispatch({ type: "SET_USER", payload: data });

          // Handle verification check and redirect
          if (data.verified) {
            if (
              data.onboarding_step === 1 &&
              !pathname.startsWith("/dashboard")
            ) {
              router.push("/dashboard/autoapply");
              return;
            }
          } else {
            router.push("/auth/otp");
            setReady(true);
            setLoading(false);
            return;
          }

          if (
            data.onboarding_step === 0 &&
            !pathname.startsWith("/onboarding/uploadresume")
          ) {
            router.push("/onboarding/uploadresume");
            return;
          }
        } catch (error) {
          //console.log("Error fetching user data:", error);
        }
      }
      // If no token and not on public routes, redirect to sign-in
      else if (
        ![
          "/",
          "/aboutus",
          "/search",
          "/auth/sign-in",
          "/auth/sign-up",
          "/auth/reset-password",
          "/auth/forgot-password",
          "/features",
          "/features/mockinterview",
          "/features/atsanalysis",
          "/features/autoapply",
          "/features/jobsearch",
          "/legal/terms",
          "/legal/privacy",
          "/jobinfo",
        ].includes(pathname)
      ) {
        router.push("/auth/sign-in");
        return;
      }

      setReady(true);
      setLoading(false);
    };

    fetchUserData();
  }, [dispatch, pathname, router]);

  if (loading || !ready) {
    return (
      <div className="flex justify-center items-center w-full min-h-[100vh]">
        <Logo />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
