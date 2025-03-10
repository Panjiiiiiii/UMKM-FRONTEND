import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookies";
import { H1, H2, P } from "@/components/ui/atoms/Text";

const ProtectedRoutes = ({ children, expectedRole }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const token = getCookie("token");
  const role = getCookie("role"); // Ambil nilai role langsung

  useEffect(() => {
    // Check if token exists and if the role matches the expected role
    if (!token || role !== expectedRole) {
      router.push("/unauthorized"); // Redirect to unauthorized page if token or role is invalid
    } else {
      setIsLoading(false); // Set loading to false only if token and role are valid
    }
  }, [token, role, expectedRole, router]);

  // Render children only if token exists, role matches, and loading is finished
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <P className='text-gray-400'>Loading....</P>
      </div>
    ); // Show loading state while checking
  }

  return token && role === expectedRole ? children : null;
};

export default ProtectedRoutes;