import instance from "../axiosinstance";

const DeleteCoverletterApi = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.delete(
      `/api/v1/coverletter/delete-letter/${id}`,
      {
        headers,
      }
    );
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to delete coverletter. Please try again",
    };
  }
};

export default DeleteCoverletterApi;
