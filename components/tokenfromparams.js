"use client";
import { useUser } from "@/context/userContext";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const TokenfromParams = () => {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const { state } = useUser();
  const user = state.user;

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [token, user, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Signing you in...</p>
    </div>
  );
};

export default TokenfromParams;
