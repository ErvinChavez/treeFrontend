import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { isAuthenticated } from "@/utils/auth";
import AdminLayout from "@/components/layout/AdminLayout";
import EmployeeCard from "@/components/cards/EmployeeCard";
import EmployeeForm from "@/components/forms/EmployeeForm";

//Queries
const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
      email
      phone
    }
  }
`;

//Mutation
const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($name: String!, $email: String, $phone: String) {
    createEmployee(name: $name, email: $email, phone: $phone) {
      id
      name
    }
  }
`;

export default function Employees() {
  const router = useRouter();

  // Protect route
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
    }
  }, [router]);

  const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES);

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: () => refetch(),
  });

  const handleCreate = async (form) => {
    await createEmployee({
      variables: form,
    });
  };

  if (loading) return <p className="p-6">Loading employees...</p>;
  if (!isAuthenticated()) return null;
  if (error) return <p className="p-6 text-red-500">Error loading employees</p>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Employees</h1>

      {/* Create Employee */}
      <EmployeeForm onCreate={handleCreate} />

      {/* Employee List */}
      <div className="grid gap-4 md:grid-cols-2">
        {data?.employees?.map((emp) => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </AdminLayout>
  );
}