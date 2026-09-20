import { useState, useRef } from "react";
import axios from 'axios';

export default function PhotoUpload({ jobId, onUpload }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleUpload = async () => {
        if (!file) return setError('Please select a file.');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobId', jobId);
        

        setLoading(true);

        try {
            const token = localStorage.getItem('token'); //JWT stored on login

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
                formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            setFile(null);

            if (onUpload) onUpload(res.data.url); //update parent
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Upload failed');
        }

        setLoading(false);
    };

    return (
        <div className="stack-xs">
            {/* Native file inputs render with the browser's own unstyled widget, so it's
                hidden (not display:none, which breaks keyboard/click handling in some
                browsers) and triggered via the ref from a styled label that looks like
                our other buttons instead. */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="sr-only"
            />

            <div className="flex items-center gap-3">
                <label
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-outline btn-sm cursor-pointer"
                >
                    Choose File
                </label>

                <span className="text-sm text-brand-dark/70">
                    {file ? file.name : 'No file selected'}
                </span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                onClick={handleUpload}
                disabled={loading}
                className="btn btn-accent"
            >
                {loading ? 'Uploading...' : 'Upload Photo'}
            </button>
        </div>
    );
}