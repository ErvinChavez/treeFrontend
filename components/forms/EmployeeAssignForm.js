export default function EmployeeAssignForm({
    job,
    empData,
    selectedEmployees,
    setSelectedEmployees,
    assignEmployees
}) {
    return (
        <div className="section">
            <p className="section-title">Assign Employees</p>

            <div className="space-y-1">
                {empData?.employees?.map((emp) => (
                    <label key={emp.id} className="flex items-center gap-2 text-sm">
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
                    {emp.name}
                </label>
            ))}
            </div>
        </div>
    );
}