import instance from "../axiosinstance";

const GetCoverletterApi = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const res = await instance.get("/api/v1/coverletter/generate-letter", {
      headers,
    });
    return res.data;
  } catch (error) {
    console.error("Error in GetCoverletterApi:", err);
    return {
      error:
        error?.response?.data?.error || "Failed to get user. Please try again",
    };
  }
};

export default GetCoverletterApi;
