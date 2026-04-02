export default function PhotoGallery({ photos }) {
    return (
        <div className="mt-3">
            <p className="font-semibold">Photos:</p>

            <div className="fles gap-2 overflow-x-auto mt-2">
                {photos?.map((url, i) => (
                    <img
                        key={i}
                        src={url}
                        alt="Job"
                        className="h-24 w-24 object-cover rounded border"
                    />
                ))}
            </div>
        </div>
    );
}