import { useState } from "react";
import axios from 'axios';

export default function PhotoUpload({ jobId, type, onUpload }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handeleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleUpload = async () => {
        if (!file) return setError('Please select a file.');

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('jobId', jobId);
        formData.append('type', type); //'before' or 'after'

        setLoading(true);
        try {
            const token = localStorage.getItem('token'); //JWT stored on login
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
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
        <div>
            <input type="file" accept="image/*" onChange={handeleFileChange} />
            {error && <span className="text-red-500">{error}</span>}
            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading ? 'Uploading...' : 'Upload Photo'}
            </button>
        </div>
    );
}

