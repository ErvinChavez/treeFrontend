import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/auth";
import AdminLayout from "@/components/layout/AdminLayout";
import { GET_SERVICES } from "@/lib/graphql/queries/services";
import { CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE } from "@/lib/graphql/mutations/services";

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
    <AdminLayout>
      <div className="stack">
        <div>
          <h1 className="page-title">Manage Services</h1>
        </div>
        
        {/* ADD Service */}
        <div className="section">
          <h2 className="section-title">Add Service</h2>

          <div className="section-card">
            <div className="stack-sm">

              <input
                placeholder="Service name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="input"
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
                className="input"
              />
              
              <button onClick={handleAdd} className="btn btn-primary w-full md:w-auto">
                Add
              </button>

            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="section">
          <h2 className="section-title">Services</h2>

          <div className="section-body">
            {services.map((s) => (
              <div key={s.id} className="card card-interactive">

                <p className="text-subtitle">{s.name}</p>
                <p className="text-muted">{s.description}</p>

                <div className="card-footer">
                  <button
                    onClick={() =>
                      setEditService({
                        id: Number(s.id),
                        name: s.name,
                        description: s.description,
                      })
                    }
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(Number(s.id))}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
             
              </div>
            ))} 
          </div>
        </div>

        {/* EDIT MODAL */}
        {editService && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            
            <div className="card w-96 stack-sm">

              <h2 className="text-title">Edit Service</h2>

              <div className="stack-xs">
                <input
                  value={editService.name}
                  onChange={(e) =>
                    setEditService({ ...editService, name: e.target.value })
                  }
                  className="input"
                />

                <input
                  value={editService.description}
                  onChange={(e) =>
                    setEditService({
                      ...editService,
                      description: e.target.value,
                    })
                  }
                  className="input"
                />
              </div>

              <div className="card-footer">
                <button
                  onClick={() => setEditService(null)}
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

      </div>
    </AdminLayout>
  );
}