import axiosInstance from "../utils/axiosInstance";

/* ================= CREATE EMPLOYEE ================= */

export const createEmployeeApi = async (formData) => {
  try {

    const response = await axiosInstance.post(
      "/oldEmployees/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;

  } catch (err) {

    throw err.response?.data || {
      success: false,
      message: err.message,
    };

  }
};

/* ================= GET ALL EMPLOYEES ================= */
export const getEmployeesApi = async (filters) => {

  try {

    const response = await axiosInstance.get(
      "/oldEmployees/getEmployees",
      {
        params: filters,
      }
    );
// console.log("API response:", response.data);
    return response;

  } catch (err) {

    throw err.response?.data || {
      success: false,
      message: err.message,
    };

  }

};

/* ================= GET ALL EMPLOYEES OLD+NEW ================= */
export const getAllEmployeesApi = async (filters) => {

  try {

    const response = await axiosInstance.get(
      "/oldEmployees/getEmployees",
      {
        params: filters,
      }
    );
// console.log("API response:", response.data);
    return response;

  } catch (err) {

    throw err.response?.data || {
      success: false,
      message: err.message,
    };

  }

};


/* ================= GET SINGLE EMPLOYEE ================= */

export const getEmployeeByIdApi = async (id) => {

  try {

    const response = await axiosInstance.get(
      `/oldEmployees/${id}`
    );

    return response.data.data;

  } catch (err) {

    throw err.response?.data || {
      success: false,
      message: err.message,
    };

  }

};


/* ================= UPDATE EMPLOYEE ================= */

export const updateEmployeeApi = async (id, formData) => {
console.log("Updating employee with ID:", id);
console.log("Updating employee with formData:", formData);
  try {

    const response = await axiosInstance.patch(
      `/oldEmployees/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;

  } catch (err) {

    throw err.response?.data || {
      success: false,
      message: err.message,
    };

  }

};


