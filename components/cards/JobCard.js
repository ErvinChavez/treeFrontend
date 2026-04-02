import PhotoUpload from "@/components/forms/PhotoUpload";
import StatusDropdown from "@/components/forms/StatusDropdown";
import FeedbackForm from "@/components/forms/FeedbackForm";
import EmployeeAssignForm from "@/components/forms/EmployeeAssignForm";
import ClientInfo from "@/components/cards/ClientInfo";
import ServiceList from "@/components/cards/ServiceList";
import PhotoGallery from "@/components/cards/PhotoGallery";
import PhotoUploadSection from "@/components/forms/PhotoUploadSection";

export default function JobCard({
    job,
    updateStatus,
    submitFeedback,
    assignEmployees,
    empData,
    selectedEmployees,
    setSelectedEmployees,
    refetch
}) {
  return (
    <div className="border p-4 rounded shadow">

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

        {/* Feedback */}
        <FeedbackForm job={job} submitFeedback={submitFeedback} />

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