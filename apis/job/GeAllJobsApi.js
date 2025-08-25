import instance from "../axiosinstance";

const GeAllJobsApi = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.get("/api/v1/job/getallsavedjobs", { headers });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to fetch jobs. Please try again",
    };
  }
};

export default GeAllJobsApi;
