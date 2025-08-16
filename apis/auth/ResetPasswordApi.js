import instance from "../axiosinstance";
const ResetPasswordApi = async (body) => {
  try {
    const res = await instance.post("/api/v1/auth/reset-password", body);
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error || "Failed to Sign in. Please try again",
    };
  }
};

export default ResetPasswordApi;
