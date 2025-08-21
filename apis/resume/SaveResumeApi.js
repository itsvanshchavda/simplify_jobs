import instance from "../axiosinstance";

const SaveResumeApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.post("/api/v1/resume/saveresume", body, {
      headers,
    });

    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to customize resume. Please try again",
    };
  }
};

export default SaveResumeApi;
