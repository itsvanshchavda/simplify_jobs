import instance from "../axiosinstance";

const AddResumeApi = async (file, primary) => {
  try {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("resume", file);

    const res = await instance.post(
      `/api/v1/resume/addresume?isDefaultResume=${primary}`,
      formData,
      {
        headers,
      }
    );
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to upload file . Please try again",
    };
  }
};

export default AddResumeApi;
