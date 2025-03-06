"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { Checkbox } from "../../atoms/Input";
import login from "@/auth/handler"; // Import login handler
import toast from "react-hot-toast";

export const LoginForm = ({ onSubmit, onForgotPassword }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Use useRouter to navigate
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      const result = await login(form.username, form.password, router);
      if (result) {
        onSubmit(result);
        toast.success(`Berhasil login`);
      }
    } catch (error) {
      toast.error("Gagal login");
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <Input
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
      />
      <Checkbox
        label="Show Password"
        checked={showPassword}
        onChange={toggleShowPassword}
      />
      <Button variant="primary" onClick={handleSubmit} fullWidth>
        Login
      </Button>
      <div className="mt-4">
        <span
          className="text-blue-500 cursor-pointer mt-4"
          onClick={onForgotPassword}
        >
          Forgot Password?
        </span>
      </div>
    </div>
  );
};
