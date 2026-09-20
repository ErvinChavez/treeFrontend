import Image from "next/image";
import { useMutation } from "@apollo/client/react";
import { TOGGLE_FEATURED_PHOTO } from "@/lib/graphql/mutations/photos";

export default function PhotoGallery({ photos }) {
    const [toggleFeatured] = useMutation(TOGGLE_FEATURED_PHOTO);

    const handleToggle = async (photoId) => {
        try {
            await toggleFeatured({ variables: { id: photoId } });
        } catch (err) {
            console.error("Failed to toggle featured photo:", err);
        }
    };

    return (
        <div className="stack-xs">
            <p className="section-title">Photos:</p>

            <div className="flex gap-2 overflow-x-auto">
                {photos?.map((photo) => (
                    <div key={photo.id} className="relative shrink-0">
                        <Image
                            src={photo.url}
                            alt="Job"
                            width={96}
                            height={96}
                            className="h-24 w-24 object-cover rounded-lg border"
                        />

                        <button
                            type="button"
                            onClick={() => handleToggle(Number(photo.id))}
                            title={photo.featured ? "Remove from public gallery" : "Show on public gallery"}
                            className={`absolute top-1 right-1 text-xs px-1.5 py-0.5 rounded-full ${
                                photo.featured
                                    ? "bg-brand-accent text-white"
                                    : "bg-white/80 text-brand-dark"
                            }`}
                        >
                            {photo.featured ? "★" : "☆"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}