import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SERVICES, CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE } from "@/lib/graphql/services";

export default function AdminServices() {
  const { data, refetch } = useQuery(GET_SERVICES);
  const [createService] = useMutation(CREATE_SERVICE);
  const [updateService] = useMutation(UPDATE_SERVICE);
  const [deleteService] = useMutation(DELETE_SERVICE);

  const [newService, setNewService] = useState({ name: "", description: "" });
  const [editService, setEditService] = useState(null);

  const handleAdd = async () => {
    if (!newService.name) return;
    await createService({ variables: newService });
    setNewService({ name: "", description: "" });
    refetch();
  };

  const handleUpdate = async () => {
    if (!editService?.name) return;
    await updateService({ variables: editService });
    setEditService(null);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteService({ variables: { id } });
    refetch();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Services</h1>

      {/* Add new service */}
      <div className="flex gap-2 mb-6">
        <input
          placeholder="Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          className="border p-2 rounded"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 rounded">Add</button>
      </div>

      {/* Services list */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.services?.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.description}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => setEditService({ id: s.id, name: s.name, description: s.description })}
                  className="bg-yellow-400 px-2 rounded">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="bg-red-500 px-2 rounded text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit modal */}
      {editService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2 className="mb-4">Edit Service</h2>
            <input
              placeholder="Name"
              value={editService.name}
              onChange={(e) => setEditService({ ...editService, name: e.target.value })}
              className="border p-2 rounded mb-2 w-full"
            />
            <input
              placeholder="Description"
              value={editService.description}
              onChange={(e) => setEditService({ ...editService, description: e.target.value })}
              className="border p-2 rounded mb-4 w-full"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setEditService(null)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}