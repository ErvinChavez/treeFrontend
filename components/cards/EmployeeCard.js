export default function EmployeeCard({ employee }) {
  return (
    <div className="card card-interactive space-y-1">
      <h2 className="text-title">{employee.name}</h2>
      <p className="text-muted">{employee.email || "No email"}</p>
      <p className="text-muted">{employee.phone || "No phone"}</p>
    </div>
  );
}