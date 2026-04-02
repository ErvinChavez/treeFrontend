export default function EmployeeAssignForm({
    job,
    empData,
    selectedEmployees,
    setSelectedEmployees,
    assignEmployees
}) {
    return (
        <div className="mt-3">
            <p className="font-semibold">Assign Employees</p>

            {empData?.employees?.map((emp) => (
                <label key={emp.id} className="block">
                    <input
                        type="checkbox"
                        checked={
                            selectedEmployees[job.id]?.includes(Number(emp.id)) || false
                        }
                        onChange={() => {
                            const current = selectedEmployees[job.id] || [];

                            let updated;

                            if (current.includes(Number(emp.id))) {
                                updated = current.filter((id) => id !== Number(emp.id));
                            } else {
                                updated = [...current, Number(emp.id)];
                            }

                            // Update UI instantly
                            setSelectedEmployees((prev) => ({
                                ...prev,
                                [job.id]: updated,
                            }));

                            // sync backend
                            assignEmployees({
                                variables: {
                                    jobId: Number(job.id),
                                    employeeIds: updated,
                                },
                            });
                        }}
                    />

                    <span className="ml-2">{emp.name}</span>
                </label>
            ))}
        </div>
    );
}