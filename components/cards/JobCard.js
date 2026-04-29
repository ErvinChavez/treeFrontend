import PhotoUpload from "@/components/forms/PhotoUpload";
import StatusDropdown from "@/components/forms/StatusDropdown";
import EmployeeAssignForm from "@/components/forms/EmployeeAssignForm";
import ClientInfo from "@/components/cards/ClientInfo";
import ServiceList from "@/components/cards/ServiceList";
import PhotoGallery from "@/components/cards/PhotoGallery";
import PhotoUploadSection from "@/components/forms/PhotoUploadSection";

export default function JobCard({
    job,
    updateStatus,
    assignEmployees,
    empData,
    selectedEmployees,
    setSelectedEmployees,
    refetch
}) {
  return (
    <div className="card space-y-3">

        {/* Status Dropdown */}
        <StatusDropdown job={job} updateStatus={updateStatus} />
                    
        {/* Client Info */}
        <ClientInfo client={job.client} />

        {/* Services */}
        <ServiceList services={job.services} />

        {/* Photos */}
        <PhotoGallery photos={job.photos} /> 

        {/* Upload Photos */}
        <PhotoUploadSection jobId={job.id} refetch={refetch} />

        {/* Assign Employees */}
        <EmployeeAssignForm
            job={job}
            empData={empData}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
            assignEmployees={assignEmployees}
        />  
    </div>
  );
}