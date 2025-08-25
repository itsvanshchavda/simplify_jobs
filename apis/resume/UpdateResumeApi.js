import instance from "../axiosinstance";

const UpdateResumeApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.post("/api/v1/resume/update-resume", body, {
      headers,
    });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to update resume. Please try again",
    };
  }
};

export default UpdateResumeApi;
