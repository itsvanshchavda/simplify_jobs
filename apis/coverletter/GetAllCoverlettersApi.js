import instance from "../axiosinstance";

const GetAllCoverlettersApi = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  try {
    const res = await instance("/api/v1/coverletter/getall-letters", {
      headers,
    });
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to get coverletters. Please try again",
    };
  }
};

export default GetAllCoverlettersApi;
