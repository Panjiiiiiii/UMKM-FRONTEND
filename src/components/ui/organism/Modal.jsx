export const Modal = ({ title, children, isOpen, onClose, hideClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[50] bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            {/* Tombol close hanya muncul jika `hideClose` tidak true */}
            {!hideClose && (
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    );
  };
  