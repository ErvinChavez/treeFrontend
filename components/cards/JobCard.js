import { useState } from "react";

import StatusDropdown from "@/components/forms/StatusDropdown";
import EmployeeAssignForm from "@/components/forms/EmployeeAssignForm";
import ClientInfo from "@/components/cards/ClientInfo";
import ServiceList from "@/components/cards/ServiceList";
import PhotoGallery from "@/components/cards/PhotoGallery";
import PhotoUploadSection from "@/components/forms/PhotoUploadSection";

export default function JobCard({
  job,
  updateStatus,
  updateJobTotalAmount,
  assignEmployees,
  empData,
  selectedEmployees,
  setSelectedEmployees,
  refetch,
}) {
  const [totalAmount, setTotalAmount] = useState(job.totalAmount || "");

  const handleSaveTotalAmount = async () => {
    if (totalAmount === "" || Number(totalAmount) < 0) {
      alert("Please enter a valid total amount.");
      return;
    }

    try {
      await updateJobTotalAmount({
        variables: {
          jobId: Number(job.id),
          totalAmount: Number(totalAmount),
        },
      });

      alert("Job total saved.");
    } catch (err) {
      console.error("Error saving job total:", err);
      alert("Could not save job total.");
    }
  };

  return (
    <div className="card stack">
      {/* Status Dropdown */}
      <StatusDropdown job={job} updateStatus={updateStatus} />

      <div className="stack-sm">
        {/* Client Info */}
        <ClientInfo client={job.client} />

        {/* Services */}
        <ServiceList services={job.services} />
      </div>

      <div className="section">
        <h3 className="font-semibold">Job Total</h3>

        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            min="0"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Enter agreed total"
            className="border rounded px-3 py-2 w-full"
          />

          <button
            type="button"
            onClick={handleSaveTotalAmount}
            className="px-4 py-2 rounded bg-black text-white"
          >
            Save
          </button>
        </div>

        {job.totalAmount && (
          <p className="text-sm text-muted">
            Current total: ${Number(job.totalAmount).toFixed(2)}
          </p>
        )}
      </div>

      <div className="section">
        {/* Photos */}
        <PhotoGallery photos={job.photos} />

        {/* Upload Photos */}
        <PhotoUploadSection jobId={job.id} refetch={refetch} />
      </div>

      <div className="section">
        {/* Assign Employees */}
        <EmployeeAssignForm
          job={job}
          empData={empData}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          assignEmployees={assignEmployees}
        />
      </div>
    </div>
  );
}
