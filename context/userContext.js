"use client";
import GetUserApi from "@/apis/user/GetUserApi";
import Loader from "@/components/loader";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useMemo,
} from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const initialState = { user: null };

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState(true);
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

  const isPublicPage = useMemo(
    () => publicPages.includes(pathname) || pathname.startsWith("/success"),
    [pathname]
  );

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      try {
        // ✅ Public pages
        if (isPublicPage) {
          if (token) {
            const data = await GetUserApi(token).catch(() => null);
            if (data) {
              dispatch({ type: "SET_USER", payload: data });
            } else {
              localStorage.removeItem("token");
            }
          }
          setLoading(false);
          return;
        }

        // ✅ Protected pages
        if (!token) {
          setLoading(false);
          router.push("/auth/login");
          return;
        }

        const data = await GetUserApi(token).catch(() => null);
        if (!data || data.error) {
          localStorage.removeItem("token");
          setLoading(false);
          router.push("/auth/login");
          return;
        }

        dispatch({ type: "SET_USER", payload: data });

        // Onboarding redirect
        if (!data.onboardingCompleted) {
          const steps = [
            "/onboarding/uploadresume",
            "/onboarding/job-resume",
            "/onboarding/application-kit",
          ];
          const stepPath = steps[data.onboardingStep];
          if (stepPath && !pathname.startsWith(stepPath)) {
            router.push(stepPath);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname, router, isPublicPage]);

  if (loading) return <Loader />;

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
