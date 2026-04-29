export default function EmployeeCard({ employee }) {
  return (
    <div className="card card-hover">
      <h2 className="text-lg font-semibold text-brand-dark">{employee.name}</h2>
      <p className="text-muted">{employee.email || "No email"}</p>
      <p className="text-muted">{employee.phone || "No phone"}</p>
    </div>
  );
}