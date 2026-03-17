import { useEffect, useState } from "react";
import UploadPolicyModal from "../../HR-component/policy-components/UploadPolicyModal";

const CompanyPolicy = () => {
  const [policies, setPolicies] = useState([
  {
    id: 1,
    name: "New policies.pdf",
    url: "/pdfs/new-policies.pdf",
  },
  {
    id: 2,
    name: "salary-policies.pdf",
    url: "/pdfs/salary-policies.pdf",
  },
  {
    id: 3,
    name: "salary-policies.pdf",
    url: "/pdfs/salary-policies.pdf",
  },
]);
  const [open, setOpen] = useState(false);

  const fetchPolicies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/policies");
      const data = await res.json();
      // setPolicies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Company Policies</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-slate-900 to-sky-500 text-white px-4 py-2 rounded-md text-sm"
        >
          Add Policy
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {policies.map((policy) => (
          <a
            key={policy._id}
            href={`http://localhost:5000/${policy.filePath}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center"
          >
            <div className="w-20 h-24 bg-red-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">PDF</span>
            </div>
            <p className="mt-2 text-xs text-center">{policy.fileName}</p>
          </a>
        ))}
      </div>

      {open && (
        <UploadPolicyModal
          onClose={() => setOpen(false)}
          onSuccess={fetchPolicies}
        />
      )}
    </div>
  );
};

 
export default CompanyPolicy
