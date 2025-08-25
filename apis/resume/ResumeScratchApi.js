import instance from "../axiosinstance";

const ResumeFromScratch = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.get("/api/v1/resume/resume-scratch", {
      headers,
    });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to get resumes. Please try again",
    };
  }
};

export default ResumeFromScratch;
