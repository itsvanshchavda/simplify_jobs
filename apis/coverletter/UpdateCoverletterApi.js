import instance from "../axiosinstance";

const UpdateCoverletterApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  try {
    const res = await instance.post("/api/v1/coverletter/update-letter", body, {
      headers,
    });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to update coverletter. Please try again",
    };
  }
};

export default UpdateCoverletterApi;
