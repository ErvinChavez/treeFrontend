import Image from "next/image";

export default function PhotoGallery({ photos }) {
    return (
        <div className="stack-xs">
            <p className="section-title">Photos:</p>

            <div className="flex gap-2 overflow-x-auto">
                {photos?.map((url, i) => (
                    <Image
                        key={i}
                        src={url}
                        alt="Job"
                        width={96}
                        height={96}
                        className="h-24 w-24 object-cover rounded-lg border"
                    />
                ))}
            </div>
        </div>
    );
}