import axiosInstance from "../utils/axiosInstance";

export const scheduleInterviewApi = async (data) => {
    // console.log("data",data)
  const response = await axiosInstance.post("/Interview/schedule", data);
  return response.data;
};


export const getCandidateInterviewsApi = async (id) => {
    // console.log("dataaaaa",id)
  const response = await axiosInstance.get(`/Interview/candidate/${id}`);
   console.log("dataaaaa",response)
  return response.data;
};