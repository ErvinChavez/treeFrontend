export default function PhotoGallery({ photos }) {
    return (
        <div className="section">
            <p className="section-title">Photos:</p>

            <div className="flex gap-2 overflow-x-auto mt-2">
                {photos?.map((url, i) => (
                    <img
                        key={i}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${url}`}
                        alt="Job"
                        className="h-24 w-24 object-cover rounded-lg border"
                    />
                ))}
            </div>
        </div>
    );
}