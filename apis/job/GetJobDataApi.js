import instance from "../axiosinstance";

const GetJobDataApi = async (url) => {
  try {
    const res = await instance.post("/api/v1/job/getjob", url);
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to get job data . Please try again",
    };
  }
};

export default GetJobDataApi;
