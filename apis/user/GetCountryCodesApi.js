import instance from "../axiosinstance";

const GetCountryCodesApi = async () => {
  try {
    const res = await instance("/api/v1/user/getcodes");
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error || "Failed to get codes. Please try again",
    };
  }
};

export default GetCountryCodesApi;
