import { LoginForm } from "@/components/ui/molecules/Modal/Login";
import { Modal } from "@/components/ui/organism/Modal";

export default function Home() {
  return (
    <div className="h-screen bg-[#3B694E]">
      <Modal title={"Login User"} isOpen={true} hideClose>
        <LoginForm />
      </Modal>
    </div>
  );
}
