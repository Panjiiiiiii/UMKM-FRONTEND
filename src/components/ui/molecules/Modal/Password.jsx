"use client";

import { useState } from "react";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { Checkbox } from "../../atoms/Input";
import { forgetPassword } from "@/auth/handler"; // Import forgetPassword handler
import toast from "react-hot-toast";

export const PasswordForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (
        name === "confirmPassword" &&
        updatedForm.confirmPassword !== updatedForm.password
      ) {
        setError("Password does not match");
      } else {
        setError("");
      }

      return updatedForm;
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
  
    const resetPromise = forgetPassword(form.email, form.password);
  
    toast.promise(
      resetPromise,
      {
        loading: "Sedang mengganti password...",
        success: "Berhasil mengganti password!",
        error: "Gagal mengganti password",
      }
    );
  
    try {
      const result = await resetPromise;
      if (result) {
        onSubmit(result);
        // Redirect ke halaman login setelah berhasil
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="space-y-4">
      <Input
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        value={form.confirmPassword}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Checkbox
        label="Show Password"
        checked={showPassword}
        onChange={toggleShowPassword}
      />
      <Button variant="primary" onClick={handleSubmit} fullWidth>
        Reset Password
      </Button>
      <div className="mt-4">
        <span
          className="text-blue-500 cursor-pointer mt-4"
          onClick={() =>( window.location.href = "/")}
        >
          Back to login?
        </span>
      </div>
    </div>
  );
};
