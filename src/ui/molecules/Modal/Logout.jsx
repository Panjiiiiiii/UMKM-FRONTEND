export const LogoutConfirm = ({ onConfirm, onCancel }) => {
  return (
    <div className="space-y-4 text-center">
      <p>Apakah Anda yakin ingin logout?</p>
      <div className="flex justify-center gap-4">
        <Button onClick={onCancel} variant="outline">
          Batal
        </Button>
        <Button onClick={onConfirm} variant="danger">
          Logout
        </Button>
      </div>
    </div>
  );
};
