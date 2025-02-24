export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};
