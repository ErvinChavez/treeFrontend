import { useQuery, useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { isAuthenticated } from "@/utils/auth";
import AdminLayout from "@/components/layout/AdminLayout";
import EmployeeForm from "@/components/forms/EmployeeForm";
import { GET_EMPLOYEES } from "@/lib/graphql/queries/employees";
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE, REACTIVATE_EMPLOYEE } from "@/lib/graphql/mutations/employees";

export default function Employees() {
  const router = useRouter();

  // Protect route
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const valid = isAuthenticated();

    if (!valid) {
      router.push("/admin/login");
    } else {
      setCheckedAuth(true);
    }
    }, []);

    const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES, {
      skip: !checkedAuth,
    });
    

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: () => refetch(),
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [reactivateEmployee] = useMutation(REACTIVATE_EMPLOYEE, {
    onCompleted: () => refetch(),
  });

  const [editEmployee, setEditEmployee] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleCreate = async (form) => {
    await createEmployee({
      variables: form,
    });
  };

  const handleUpdate = async () => {
    setStatusMessage("");

    try {
      await updateEmployee({ variables: editEmployee });
      setEditEmployee(null);
      refetch();
    } catch (err) {
      setStatusMessage(err?.message || "Failed to update employee.");
    }
  };

  const handleDelete = async (id) => {
    setStatusMessage("");

    try {
      const res = await deleteEmployee({ variables: { id } });
      setStatusMessage(res?.data?.deleteEmployee || "");
      refetch();
    } catch (err) {
      setStatusMessage(err?.message || "Failed to delete employee.");
    }
  };

  const handleReactivate = async (id) => {
    setStatusMessage("");

    try {
      await reactivateEmployee({ variables: { id } });
    } catch (err) {
      setStatusMessage(err?.message || "Failed to reactivate employee.");
    }
  };

  if (!checkedAuth) return null;
  if (loading) return <p className="p-6">Loading employees...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading employees</p>;

  return (
    <AdminLayout>

      <div className="stack">

        {/* Header */}
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="text-muted">Manage your team members</p>
        </div>

        {/* Add Employee */}
        <div className="section">
          <h2 className="section-title">Add Employee</h2>

          <div className="section-card">
            <EmployeeForm onCreate={handleCreate} />
          </div>
        </div>

        {statusMessage && (
          <div className="status-info">
            {statusMessage}
          </div>
        )}

        {/* List*/}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Team</h2>
          </div>

          <div className="section-grid md:grid-cols-2">
            {data?.employees?.map((emp) => (
              <div
                key={emp.id}
                className={`card card-interactive space-y-1 ${emp.active === false ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-title">{emp.name}</h2>
                  {emp.active === false && (
                    <span className="badge badge-muted">Archived</span>
                  )}
                </div>
                <p className="text-muted">{emp.email || "No email"}</p>
                <p className="text-muted">{emp.phone || "No phone"}</p>

                <div className="card-footer">
                  <button
                    onClick={() =>
                      setEditEmployee({
                        id: Number(emp.id),
                        name: emp.name,
                        email: emp.email || "",
                        phone: emp.phone || "",
                      })
                    }
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>

                  {emp.active === false ? (
                    <button
                      onClick={() => handleReactivate(Number(emp.id))}
                      className="btn btn-primary"
                    >
                      Reactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDelete(Number(emp.id))}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* EDIT MODAL */}
      {editEmployee && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="card w-96 stack-sm">

            <h2 className="text-title">Edit Employee</h2>

            <div className="stack-xs">
              <input
                placeholder="Name"
                value={editEmployee.name}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, name: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Email"
                value={editEmployee.email}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, email: e.target.value })
                }
                className="input"
              />

              <input
                placeholder="Phone"
                value={editEmployee.phone}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, phone: e.target.value })
                }
                className="input"
              />
            </div>

            <div className="card-footer">
              <button
                onClick={() => setEditEmployee(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}