"use client";

import { useState } from "react";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { Checkbox } from "../../atoms/Input";

export const LoginForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
      <Button variant="primary" onClick={() => onSubmit(form)} fullWidth>
        Login
      </Button>
    </div>
  );
};
