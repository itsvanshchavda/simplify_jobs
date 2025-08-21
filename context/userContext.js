"use client";
import GetUserApi from "@/apis/user/GetUserApi";
import Logo from "@/public/icons/logo";
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
      console.log("Setting user:", action.payload);
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

  const publicPages = [
    "/",
    "/copilot",
    "/job-tracker",
    "/resume-builder",
    "/auth/login",
    "/auth/register",
    "/auth/success",
    "/auth/fallure",
  ];

  const isPublicPage =
    publicPages.includes(pathname) || pathname.startsWith("/success");

  useEffect(() => {
    const fetchUserData = async () => {
      // For public pages, just check if we have a token and try to fetch user data
      if (isPublicPage) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const data = await GetUserApi(token);
            if (data) {
              dispatch({ type: "SET_USER", payload: data });
            }
          } catch (error) {
            console.log("Error fetching user data:", error);
            // If token is invalid, remove it
            localStorage.removeItem("token");
          }
        }
        setReady(true);
        setLoading(false);
        return;
      }

      // For protected pages, handle authentication
      setLoading(true);
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const data = await GetUserApi(token);
          if (!data || data.error) {
            console.log("User not found. Redirecting to login.");
            localStorage.removeItem("token"); // Remove invalid token
            router.push("/auth/login");
            setReady(true);
            setLoading(false);
            return;
          }

          console.log("User data fetched:", data);
          dispatch({ type: "SET_USER", payload: data });

          if (!data.onboardingCompleted) {
            switch (data.onboardingStep) {
              case 0:
                if (!pathname.startsWith("/onboarding/uploadresume")) {
                  router.push("/onboarding/uploadresume");
                }
                break;

              case 1:
                if (!pathname.startsWith("/onboarding/job-resume")) {
                  router.push("/onboarding/job-resume");
                }
                break;
              case 2:
                if (!pathname.startsWith("/onboarding/application-kit")) {
                  router.push("/onboarding/application-kit");
                }
                break;
              // Add more steps as needed
              default:
                break;
            }
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
          localStorage.removeItem("token"); // Remove invalid token
          router.push("/auth/login");
          setReady(true);
          setLoading(false);
          return;
        }
      } else {
        // No token and trying to access protected route
        router.push("/auth/login");
        setReady(true);
        setLoading(false);
        return;
      }

      setReady(true);
      setLoading(false);
    };

    fetchUserData();
  }, [dispatch, pathname, router, isPublicPage]);

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
