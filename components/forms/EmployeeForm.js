import { useState } from "react";

export default function EmployeeForm({ onCreate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);

    setForm({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="input"
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="input"
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="input"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Add Employee
      </button>
    </form>
  );
}