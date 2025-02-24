export const LoginForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button onClick={() => onSubmit(form)} fullWidth>
        Login
      </Button>
    </div>
  );
};