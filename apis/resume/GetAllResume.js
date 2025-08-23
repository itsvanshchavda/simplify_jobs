import instance from "../axiosinstance";

const GetAllResume = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.get("/api/v1/resume/getallresume", { headers });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error || "Failed to get user. Please try again",
    };
  }
};

export default GetAllResume;
