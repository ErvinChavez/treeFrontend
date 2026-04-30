import { useQuery, useMutation } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { isAuthenticated } from "@/utils/auth";
import AdminLayout from "@/components/layout/AdminLayout";
import EmployeeCard from "@/components/cards/EmployeeCard";
import EmployeeForm from "@/components/forms/EmployeeForm";
import { GET_EMPLOYEES } from "@/lib/graphql/queries/employees";
import { CREATE_EMPLOYEE } from "@/lib/graphql/mutations/employees";

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

  const handleCreate = async (form) => {
    await createEmployee({
      variables: form,
    });
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

        {/* Form Section */}
        <div className="section-card">
          <h2 className="section-title">Add Employee</h2>
          <div className="section-body">
            <EmployeeForm onCreate={handleCreate} />
          </div>
        </div>

        {/* List Section */}
        <div className="section">
          <h2 className="section-title">Team</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {data?.employees?.map((emp) => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </div>
        </div>
      </div>
      
    </AdminLayout>
  );
}