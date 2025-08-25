import instance from "../axiosinstance";

const GetFollowupMailApi = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.get("/api/v1/user/generate-mail", { headers });
    return res.data;
  } catch (error) {
    console.error("Error in GetCoverletterApi:", err);
    return {
      error:
        error?.response?.data?.error ||
        "Failed to get folloup mail. Please try again",
    };
  }
};

export default GetFollowupMailApi;
