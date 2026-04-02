export default function EmployeeCard({ employee }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-semibold">{employee.name}</h2>
      <p className="text-gray-600">{employee.email || "No email"}</p>
      <p className="text-gray-600">{employee.phone || "No phone"}</p>
    </div>
  );
}