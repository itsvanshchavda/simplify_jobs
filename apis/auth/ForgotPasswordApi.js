import instance from "../axiosinstance";
const ForgotPasswordApi = async (email) => {
  try {
    const res = await instance.post("/api/v1/auth/forgot-password", email);
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error || "Failed to Sign in. Please try again",
    };
  }
};

export default ForgotPasswordApi;
