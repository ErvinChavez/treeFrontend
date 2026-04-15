import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";
import {
  GET_SERVICES,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from "@/lib/graphql/queries/services";

export default function ServicesAdmin() {
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

  const { data, loading, error, refetch } = useQuery(GET_SERVICES, {
    skip: !checkedAuth,
  });
  

  const [createService] = useMutation(CREATE_SERVICE);
  const [updateService] = useMutation(UPDATE_SERVICE);
  const [deleteService] = useMutation(DELETE_SERVICE);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
  });

  const [editService, setEditService] = useState(null);

  if (!checkedAuth) return null;
  if (loading) return <p className="p-6">Loading services...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading services</p>;

  const services = data?.services || [];
  
  //ADD
  const handleAdd = async () => {
    if (!newService.name) return;

    await createService({ variables: newService });
    setNewService({ name: "", description: "" });
    refetch();
  };

  // UPDATE
  const handleUpdate = async () => {
    await updateService({ variables: editService });
    setEditService(null);
    refetch();
  };

  // DELETE
  const handleDelete = async (id) => {
    await deleteService({ variables: { id } });
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>

      {/* ADD NEW */}
      <div className="flex gap-2 mb-6">
        <input
          placeholder="Service name"
          value={newService.name}
          onChange={(e) =>
            setNewService({ ...newService, name: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          placeholder="Description"
          value={newService.description}
          onChange={(e) =>
            setNewService({
              ...newService,
              description: e.target.value,
            })
          }
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="grid gap-4">
        {services.map((s) => (
          <div key={s.id} className="border p-4 rounded shadow">
            <p className="font-bold">{s.name}</p>
            <p className="text-gray-600">{s.description}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() =>
                  setEditService({
                    id: Number(s.id),
                    name: s.name,
                    description: s.description,
                  })
                }
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(Number(s.id))}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl mb-4">Edit Service</h2>

            <input
              value={editService.name}
              onChange={(e) =>
                setEditService({ ...editService, name: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />

            <input
              value={editService.description}
              onChange={(e) =>
                setEditService({
                  ...editService,
                  description: e.target.value,
                })
              }
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditService(null)}
                className="border px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}