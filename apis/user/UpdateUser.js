import instance from "../axiosinstance";

const UpdateUserApi = async (body) => {
  try {
    const res = await instance.patch("/api/v1/user/updateuser", body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to update user. Please try again",
    };
  }
};

export default UpdateUserApi;
