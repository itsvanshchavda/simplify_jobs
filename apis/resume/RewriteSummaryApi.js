import instance from "../axiosinstance";

const RewriteSummaryApi = async (body) => {
  try {
    const res = await instance.post("/api/v1/resume/rewrite-summary", body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error || "Failed to get user. Please try again",
    };
  }
};

export default RewriteSummaryApi;
