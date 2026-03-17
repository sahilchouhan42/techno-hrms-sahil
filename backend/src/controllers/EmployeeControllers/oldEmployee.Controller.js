import OldEmployee from "../../models/oldEmployee.model.js";
import Employee from "../../models/employee.model.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import qs from "qs";
import { createAuditLog } from './../../services/audit.service.js';

// Helper to generate employee ID
const generateEmployeeId = (employeeData) => {
  const fullName = employeeData.personal?.fullName || "";
  const nameParts = fullName.split(" ").filter(Boolean);
  const firstNameLetter = nameParts[0]?.[0]?.toUpperCase() || "X";
  const lastNameLetter = nameParts[1]?.[0]?.toUpperCase() || "X";

  const companyLetter = "T";

  const departmentMap = {
    Development: "D",
    Marketing: "M",
    HR: "H",
    Sales: "S",
  };
  const department = employeeData.professional?.department || "";
  const departmentLetter = departmentMap[department] || "X";

  const dob = employeeData.personal?.dob ? new Date(employeeData.personal.dob) : new Date();
  const day = String(dob.getDate()).padStart(2, "0");
  const month = String(dob.getMonth() + 1).padStart(2, "0");
  const year = dob.getFullYear().toString().slice(-2);

  return `${firstNameLetter}${lastNameLetter}${companyLetter}${departmentLetter}${day}${month}${year}`;
};

// ==================== CREATE EMPLOYEE ====================
export const createEmployee = async (req, res) => {
  try {
    const files = req.files || {};

    // 1. Parse text fields (bracket notation → nested object)
    const nestedBody = qs.parse(req.body);

    // 2. Handle profile photo
    let profilePhotoUrl = null;
    if (files["personal[profilePhoto]"]) {
      const result = await uploadToCloudinary(
        files["personal[profilePhoto]"][0].buffer,
        "employees/profile"
      );
      profilePhotoUrl = result.secure_url;
    }

    // 3. Handle document uploads
    const documents = {};
    const docFields = ["aadharCard", "panCard", "resume", "education", "experience", "offerLetter"];
    for (const field of docFields) {
      const key = `documents[${field}]`;
      if (files[key]) {
        const result = await uploadToCloudinary(
          files[key][0].buffer,
          `employees/${field}`
        );
        documents[field] = result.secure_url;
      }
    }

    // 4. Build final employee data
    const employeeData = {
      ...nestedBody,
      personal: {
        ...(nestedBody.personal || {}),
        ...(profilePhotoUrl && { profilePhoto: profilePhotoUrl }),
      },
      documents: {
        ...(nestedBody.documents || {}),
        ...documents,
      },
    };

    // 5. Remove temporary "sameAsCurrent" field (if present)
    if (employeeData.address && employeeData.address.sameAsCurrent !== undefined) {
      delete employeeData.address.sameAsCurrent;
    }

    // 6. Generate and assign employee ID
    if (!employeeData.professional) employeeData.professional = {};
    employeeData.professional.employeeId = generateEmployeeId(employeeData);

    // 7. Save to database (using OldEmployee – adjust if needed)
    const employee = await OldEmployee.create(employeeData);

    // =========Audit log================//
await createAuditLog({
  user: req.user,
  action: "CREATE",
  module: "EMPLOYEE",
  recordId: employee._id,
  oldData: null,
  newData: employee,
  req,
});

    console.log("Employee created:", employee._id);

    res.status(201).json({
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==================== UPDATE EMPLOYEE ====================

export const updateEmployee = async (req, res) => {
  try {

    // console.log("Headers:", req.headers["content-type"]);
    // console.log("Body Raw:", req.body);
    // console.log("Files:", req.filesccls);

    const files = req.files || {};
    const nestedBody = { ...req.body };

    /* -------- Profile Photo Upload -------- */

    if (files["personal[profilePhoto]"]) {

      const result = await uploadToCloudinary(
        files["personal[profilePhoto]"][0].buffer,
        "employees/profile"
      );

      nestedBody.personal = {
        ...(nestedBody.personal || {}),
        profilePhoto: result.secure_url,
      };

    }

    /* -------- Documents Upload -------- */

    const docFields = [
      "aadharCard",
      "panCard",
      "resume",
      "education",
      "experience",
      "offerLetter",
    ];

    const documents = {};

    for (const field of docFields) {

      const key = `documents[${field}]`;

      if (files[key]) {

        const result = await uploadToCloudinary(
          files[key][0].buffer,
          `employees/${field}`
        );

        documents[field] = result.secure_url;

      }

    }

    if (Object.keys(documents).length > 0) {
      nestedBody.documents = {
        ...(nestedBody.documents || {}),
        ...documents,
      };
    }

    /* -------- Remove temporary field -------- */

    if (nestedBody.address?.sameAsCurrent !== undefined) {
      delete nestedBody.address.sameAsCurrent;
    }

    /* -------- Flatten nested object -------- */

    const flattenObject = (obj, prefix = "", res = {}) => {

      for (let key in obj) {

        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          flattenObject(value, newKey, res);
        } else if (value !== "" && value !== undefined && value !== null) {
          res[newKey] = value;
        }

      }

      return res;
    };

    const updateData = flattenObject(nestedBody);
   /* -------- Update -------- */

    const updatedEmployee = await OldEmployee.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });

  } catch (error) {

    console.error("Update Employee Error:", error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ==================== GET ALL EMPLOYEES (NEW + OLD) ====================
export const getAllEmployees = async (req, res) => {
  console.log("Total employees fetched:");
  try {
    const newEmployees = await Employee.find().lean();
    const oldEmployees = await OldEmployee.find().lean();

    const formattedNew = newEmployees.map((emp) => ({
      ...emp,
      employeeType: "new",
    }));

    const formattedOld = oldEmployees.map((emp) => ({
      ...emp,
      employeeType: "old",
    }));

    const allEmployees = [...formattedNew, ...formattedOld].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
console.log("Total employees fetched:", allEmployees);
    res.status(200).json({
      success: true,
      count: allEmployees.length,
      data: allEmployees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET ALL OLD EMPLOYEES (LEGACY) ====================
export const getEmployees = async (req, res) => {
  try {
    const employees = await OldEmployee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== GET EMPLOYEE BY ID (NEW MODEL) ====================
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

