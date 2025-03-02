import { useState } from "react";
import { Modal } from "@/components/ui/organism/Modal";
import { Input, Checkbox } from "@/components/ui/atoms/Input";
import { Button } from "@/components/ui/atoms/Button";
import { resetPassword } from "@/auth/handler";
import toast from "react-hot-toast";

export default function ResetPasswordModal({ isOpen, onClose, userId }) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(userId, password);
      toast.success("Password berhasil diperbarui");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reset Password`}>
      <div className="space-y-4">
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox
          label="Show Password"
          checked={showPassword}
          onChange={toggleShowPassword}
        />
        <Button
          variant="primary"
          children={`Reset Password`}
          onClick={handleResetPassword}
        />
      </div>
    </Modal>
  );
}
