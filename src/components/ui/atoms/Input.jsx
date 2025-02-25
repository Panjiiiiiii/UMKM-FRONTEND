export const Input = ({ label, name, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name} className="mb-1 text-sm font-medium">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange} // Pastikan onChange diteruskan
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
      />
    </div>
  );
};

// components/atoms/Checkbox.js
export const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden peer" // Peer untuk styling
      />
      <div className="w-4 h-4 border-2 border-gray-500 rounded-sm flex items-center justify-center peer-checked:border-green-800 peer-checked:bg-green-800 transition">
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l4 4 10-10" />
          </svg>
        )}
      </div>
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};
