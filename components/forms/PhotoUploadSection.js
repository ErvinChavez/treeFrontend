import PhotoUpload from "@/components/forms/PhotoUpload";

export default function PhotoUploadSection({ jobId, refetch }) {
  return (
    <div className="section">
      <p className="section-title">Upload Photos:</p>

      <PhotoUpload jobId={jobId} onUpload={refetch} />
      
    </div>
  );
}