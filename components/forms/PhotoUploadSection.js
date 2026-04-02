import PhotoUpload from "@/components/forms/PhotoUpload";

export default function PhotoUploadSection({ jobId, refetch }) {
  return (
    <div className="mt-3">
      <p className="font-semibold">Upload Before/After Photos:</p>

      <div className="flex gap-4 mt-2">
        <PhotoUpload jobId={jobId} type="before" onUpload={refetch} />
        <PhotoUpload jobId={jobId} type="after" onUpload={refetch} />
      </div>
    </div>
  );
}