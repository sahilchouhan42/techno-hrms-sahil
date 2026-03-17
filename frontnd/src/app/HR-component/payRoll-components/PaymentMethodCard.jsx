

export default function PaymentMethodCard() {
  return (
    <div className="w-full max-w-6xl rounded-lg border border-gray-200 bg-white px-5 py-4 mb-2">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50">
            {/* Credit Card Icon */}
            <svg
              className="h-4 w-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>

          <span className="text-sm font-semibold text-gray-900">
            Payment Method
          </span>
        </div>

        <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
          Change Payment Method
        </button>
      </div>

      {/* Body */}
      <div className="grid grid-cols-4 gap-6">
        <InfoBlock
          label="Cardholder name"
          value="Anyname Company LTD"
        />

        <InfoBlock
          label="Account Number"
          value="•••• •••• •••• 8954"
        />

        <InfoBlock
          label="Date"
          value="01/25"
        />

        <InfoBlock
          label="Payment Method"
          value="NFT"
        />
      </div>
    </div>
  );
}

/* Reusable sub-component */
function InfoBlock({ label, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}
