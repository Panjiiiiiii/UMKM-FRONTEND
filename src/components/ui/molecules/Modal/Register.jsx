"use client";

import { Checkbox, Input } from "@/components/ui/atoms/Input";
import { Button } from "@/components/ui/atoms/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { register } from "@/auth/handler";

export const RegisterForm = ({ onClose }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    const registerPromise = register(form);

    toast.promise(registerPromise, {
      loading: "Proses registrasi...",
      success: "Berhasil menambah user 🎉",
      error: "Gagal menambah user ❌",
    });

    try {
      await registerPromise;
      onClose(); // ✅ Modal tertutup otomatis setelah sukses
    } catch (error) {
      console.error("Error registering user:", error);
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
        label="Email"
        name="email"
        type="email"
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
      <Checkbox
        label="Show Password"
        checked={showPassword}
        onChange={toggleShowPassword}
      />

      {/* Role Dropdown */}
      <div className="flex flex-col">
        <label className="text-gray-700 mb-1">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
        >
          <option value="ADMIN">Admin</option>
          <option value="PURCHASING">Purchasing</option>
          <option value="PRODUCTION">Production</option>
          <option value="FINANCE">Finance</option>
        </select>
      </div>

      <Button onClick={handleSubmit} variant="primary">
        Register
      </Button>
    </div>
  );
};
