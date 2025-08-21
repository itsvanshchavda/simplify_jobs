import instance from "../axiosinstance";

const UpdateDefaultResumeApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.post(
      "/api/v1/resume/update-defaultresume",
      body,
      {
        headers,
      }
    );

    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to update default resume. Please try again",
    };
  }
};

export default UpdateDefaultResumeApi;
