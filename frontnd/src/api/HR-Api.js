import axiosInstance from "../utils/axiosInstance";


// api/jobApi.js
export const createJob = async (data) => {
  const res = await axiosInstance.post("/jobs/create", data);
  return res.data;
};
