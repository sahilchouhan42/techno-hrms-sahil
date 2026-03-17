import { useForm } from "react-hook-form";
import { useState } from "react";

import PersonalStep from "./steps/PersonalStep";
import ContactStep from "./steps/ContactStep";
import AccountsStep from "./steps/AccountsStep";
import DocumentsStep from "./steps/DocumentsStep";
import SummaryStep from "./steps/SummaryStep";
import { useNavigate } from "react-router-dom";

export default function EmployeeForm() {
  const { register, handleSubmit, watch, setValue } = useForm({
    shouldUnregister: false,
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  
  const copyAddress = () => {
    setValue("permanentAddress", watch("currentAddress"));
  };

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof FileList) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("/api/employees/create", {
        method: "POST",
        body: formData,
      });
     navigate("/hr/employees");
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto w-full">
      <div className="steps w-full mb-6">
        <div className={`step ${step >= 1 ? "step-primary" : ""}`}>
          Personal
        </div>
        <div className={`step ${step >= 2 ? "step-primary" : ""}`}>Contact</div>
        <div className={`step ${step >= 3 ? "step-primary" : ""}`}>
          Accounts
        </div>
        <div className={`step ${step >= 4 ? "step-primary" : ""}`}>
          Documents
        </div>
        <div className={`step ${step >= 5 ? "step-primary" : ""}`}>Summary</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <PersonalStep register={register} setStep={setStep} />}

        {step === 2 && (
          <ContactStep
            register={register}
            setStep={setStep}
            watch={watch}
            setValue={setValue}
            copyAddress={copyAddress}
          />
        )}

        {step === 3 && <AccountsStep register={register} setStep={setStep} />}

        {step === 4 && <DocumentsStep register={register} setStep={setStep} />}

        {step === 5 && <SummaryStep data={watch()} setStep={setStep} />}
      </form>
    </div>
  );
}
