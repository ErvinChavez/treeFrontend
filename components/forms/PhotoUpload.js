import { useState } from "react";
import axios from 'axios';

export default function PhotoUpload({ jobId, onUpload }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleUpload = async () => {
        if (!file) return setError('Please select a file.');

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('jobId', jobId);
        

        setLoading(true);
        try {
            const token = localStorage.getItem('token'); //JWT stored on login
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFile(null);
            if (onUpload) onUpload(res.data.url); //update parent
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Upload failed');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-2">
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm"/>
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button
                onClick={handleUpload}
                disabled={loading}
                className="btn btn-secondary"
            >
                {loading ? 'Uploading...' : 'Upload Photo'}
            </button>
        </div>
    );
}

