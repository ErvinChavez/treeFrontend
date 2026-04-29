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

    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-3 mb-6">
      <h2 className="text-lg font-semibold text-brand-dark">
        Add Employee
      </h2>

      <div className="form-section">
        <label className="label">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
        />
      </div>

      <div className="form-section">
        <label className="label">Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input"
        />
      </div>

      <div className="form-section">
        <label className="label">Phone</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="input"
        />
      </div>
      

      <button className="btn btn-primary">
        Add Employee
      </button>
    </form>
  );
}