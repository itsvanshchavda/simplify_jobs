import instance from "../axiosinstance";

const GetPublicResumeApi = async (body) => {
  try {
    const res = await instance.post("/api/v1/resume/get-shared-resume", body);
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to get public resume. Please try again",
    };
  }
};

export default GetPublicResumeApi;
