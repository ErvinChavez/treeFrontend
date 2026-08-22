import { useState } from "react";

export default function EmployeeAssignForm({
    job,
    empData,
    selectedEmployees,
    setSelectedEmployees,
    assignEmployees
}) {
    const [saveError, setSaveError] = useState("");

    const handleToggle = async (emp) => {
        setSaveError("");

        const previous = selectedEmployees[job.id] || [];
        let updated;

        if (previous.includes(Number(emp.id))) {
            updated = previous.filter((id) => id !== Number(emp.id));
        } else {
            updated = [...previous, Number(emp.id)];
        }

        // Update UI instantly (optimistic)
        setSelectedEmployees((prev) => ({
            ...prev,
            [job.id]: updated,
        }));

        try {
            await assignEmployees({
                variables: {
                    jobId: Number(job.id),
                    employeeIds: updated,
                },
            });
        } catch (err) {
            // Revert the optimistic update — don't let the checkbox lie
            // about what's actually saved in the database.
            setSelectedEmployees((prev) => ({
                ...prev,
                [job.id]: previous,
            }));
            setSaveError(
                `Failed to save employee assignment: ${err?.message || "unknown error"}`
            );
        }
    };

    return (
        <div className="stack-xs">
            <p className="section-title">Assign Employees</p>

            {saveError && (
                <div className="status-error">
                    {saveError}
                </div>
            )}

            <div className="space-y-2">
                {empData?.employees
                    ?.filter((emp) => emp.active !== false) // don't offer archived employees for new assignments
                    .map((emp) => (
                    <label key={emp.id} className="flex items-center gap-2 text-body cursor-pointer">
                        <input
                            type="checkbox"
                            checked={
                                selectedEmployees[job.id]?.includes(Number(emp.id)) || false
                            }
                            onChange={() => handleToggle(emp)}
                        />
                        {emp.name}
                    </label>
                ))}
            </div>
        </div>
    );
}