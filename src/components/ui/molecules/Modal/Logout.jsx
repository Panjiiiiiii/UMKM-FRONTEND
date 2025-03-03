import { DoorOpen } from "lucide-react";
import { Button } from "../../atoms/Button";
import { P } from "../../atoms/Text";

export const LogoutConfirm = ({ onConfirm, onCancel }) => {
  return (
    <div className="space-y-4 text-center">
      <P className={`text-red-800`}>Apakah Anda yakin ingin logout?</P>
      <div className="flex justify-center gap-4">
        <Button onClick={onCancel} variant="outline" children={`Batal`}/>
        <Button onClick={onConfirm} variant="danger" icon={<DoorOpen/>} children={`Logout`}/>
      </div>
    </div>
  );
};
