import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PersonalStep from "./steps/PersonalStep";
import ContactStep from "./steps/ContactStep";
import AddressStep from "./steps/AddressStep";
import ProfessionalStep from "./steps/ProfessionalStep";
import AccountStep from "./steps/AccountStep";
import BankStep from "./steps/BankStep";
import DocumentsStep from "./steps/DocumentsStep";
import { useNavigate } from "react-router-dom";
import SummaryStep from "./steps/SummaryStep";
import ResponseModal from "../../../../components/ResponseModal";
import { createEmployeeApi } from "../../../../api/employee-Api";

const steps = [
  "Personal",
  "Contact",
  "Address",
  "Professional",
  "Account",
  "Bank",
  "Documents",
  "Summary",
];

const stepFields = {
  0: ["personal"],
  1: ["contact"],
  2: ["address"],
  3: ["professional"],
  4: ["account"],
  5: ["bank"],
  6: ["documents"],
  7: [], // summary me validation nahi
};

const defaultValues = {
  personal: {
    fullName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    maritalStatus: "",
    dob: "",
    nationality: "",
    bloodGroup: "",
    profilePhoto: null,
  },
  contact: {
    primaryPhone: "",
    alternatePhone: "",
    personalEmail: "",
    emergencyContact: {
      name: "",
      relation: "",
      phone: "",
    },
  },
  address: {
    current: {
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    permanent: {
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  },
  professional: {
    employeeId: "",
    department: "",
    designation: "",
    employmentType: "",
    status: "Active",
    dateOfJoining: "",
    WeekOff: "FIRST_THIRD",
  },
  account: {
    officialEmail: "",
    officialPassword: "",
    skypeId: "",
    skypePassword: "",
    personalEmail: "",
    notes: "",
  },
  bank: {
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
  },
  documents: {
    aadharCard: null,
    panCard: null,
    resume: null,
    education: null,
    experience: null,
    offerLetter: null,
  },
};

export default function MainForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
    mode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit, trigger } = methods;

  /* ---------------- NEXT STEP ---------------- */

  const nextStep = async () => {
    // const isValid = await trigger(stepFields[currentStep]);

    // if (!isValid) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  /* ---------------- PREVIOUS STEP ---------------- */

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /* ---------------- BUILD FORMDATA ---------------- */

  const appendFormData = (formData, data, parentKey = "") => {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof FileList) {
        formData.append(formKey, value[0]);
      } else if (value instanceof File) {
        formData.append(formKey, value);
      } else if (typeof value === "object" && value !== null) {
        appendFormData(formData, value, formKey);
      } else {
        formData.append(formKey, value ?? "");
      }
    });
  };

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data) => {
    try {
      if (data.professional?.manager === "") {
        delete data.professional.manager;
      }

      const formData = new FormData();

      appendFormData(formData, data);

      const result = await createEmployeeApi(formData);

      console.log("API response:", result);

      setModalType("success");
      setModalMessage(result.message || "Employee created successfully!");
      setModalOpen(true);
    } catch (err) {
      console.error(err);

      setModalType("error");
      setModalMessage(err.message || "Failed to create employee");
      setModalOpen(true);
    }
  };

  const StepComponent = [
    PersonalStep,
    ContactStep,
    AddressStep,
    ProfessionalStep,
    AccountStep,
    BankStep,
    DocumentsStep,
    SummaryStep,
  ][currentStep];

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-bold text-center mb-3">
          Employee Registration
        </h1>

        {/* Stepper */}

        <ul className="steps steps-horizontal mb-8 w-full overflow-x-auto">
          {steps.map((label, idx) => (
            <li
              key={idx}
              className={`step ${idx <= currentStep ? "step-primary" : ""}`}
            >
              {label}
            </li>
          ))}
        </ul>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <FormProvider {...methods}>
              <form
                onSubmit={(e) => {
                  if (currentStep !== steps.length - 1) {
                    e.preventDefault(); // submit block karo
                    return;
                  }
                  handleSubmit(onSubmit)(e);
                }}
              >
                <StepComponent />

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="btn btn-outline"
                  >
                    Previous
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        nextStep();
                      }}
                      className="btn btn-primary"
                    >
                      Next
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
      <ResponseModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          navigate("/hr/employees");
        }}
        type={modalType}
        message={modalMessage}
      />
    </div>
  );
}
