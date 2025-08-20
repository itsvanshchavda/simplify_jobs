import instance from "../axiosinstance";
const RegisterApi = async (body) => {
  try {
    const res = await instance.post("/api/v1/auth/register", body);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error || "Failed to registser. Please try again",
    };
  }
};

export default RegisterApi;
