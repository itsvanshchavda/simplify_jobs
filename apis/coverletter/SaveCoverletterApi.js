import instance from "../axiosinstance";

const SaveCoverletterApi = async (body) => {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const res = await instance.post("/api/v1/coverletter/save-letter", body, {
      headers,
    });
    return res.data;
  } catch (error) {
    console.error("Error in GetCoverletterApi:", err);
    return {
      error:
        error?.response?.data?.error ||
        "Failed to save coverletter. Please try again",
    };
  }
};

export default SaveCoverletterApi;
