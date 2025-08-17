import instance from "../axiosinstance";

const GetUserApi = async () => {
  try {
    const res = await instance.get("/api/v1/user/getuser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error || "Failed to Sign in. Please try again",
    };
  }
};

export default GetUserApi;
