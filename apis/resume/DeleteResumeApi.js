import React from "react";
import instance from "../axiosinstance";

const DeleteResumeApi = async (resumeId) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res = await instance.delete(
      `/api/v1/resume/delete-resume/${resumeId}`,
      {
        headers,
      }
    );
    return res.data;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error ||
        "Failed to delete resume. Please try again",
    };
  }
};

export default DeleteResumeApi;
