import instance from "../axiosinstance";

const SaveJobDataApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.post("/api/v1/job/savejobdata", body, {
      headers,
    });

    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to save job data. Please try again",
    };
  }
};

export default SaveJobDataApi;
