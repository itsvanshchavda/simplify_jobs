import instance from "../axiosinstance";

const GetCoverletterByIdApi = async (body) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  try {
    const res = await instance.post(
      "/api/v1/coverletter/getcoverletter",
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
        "Failed to get coverletter. Please try again",
    };
  }
};

export default GetCoverletterByIdApi;
