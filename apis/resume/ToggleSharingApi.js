import instance from "../axiosinstance";

const ToggleSharingApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  try {
    const res = await instance.post("/api/v1/resume/toggle-sharing", body, {
      headers,
    });

    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to toggle sharing. Please try again",
    };
  }
};

export default ToggleSharingApi;
