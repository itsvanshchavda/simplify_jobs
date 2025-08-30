import instance from "../axiosinstance";

const UploadProfilePicApi = async (file) => {
  try {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("image", file);

    const res = await instance.post(
      "/api/v1/user/upload-profile-pic",
      formData,
      { headers }
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

export default UploadProfilePicApi;
