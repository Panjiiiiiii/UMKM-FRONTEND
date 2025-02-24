"use client";

import { Input } from "@/ui/atoms/Input";
import { Button } from "@/ui/atoms/Button";
import { useState } from "react";

export const RegisterForm = ({ onSubmit }) => {
    const [form, setForm] = useState({ username: "", email: "", password: "", role: "customer" });
  
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
    return (
      <div className="space-y-4">
        <Input label="Username" name="username" value={form.username} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
  
        {/* Role Enum Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Role</label>
          <select 
            name="role" 
            value={form.role} 
            onChange={handleChange} 
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>
  
        <Button onClick={() => onSubmit(form)} fullWidth>Register</Button>
      </div>
    );
  };