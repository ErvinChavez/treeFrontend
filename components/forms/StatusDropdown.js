import { formatStatus } from "@/utils/format";

export default function StatusDropdown({job, updateStatus}) {  
    return (
        <div className="mt-2">
            <p className="font-semibold mb-1">
                Status: {formatStatus(job.status)}
            </p>
            <select
                value={job.status}
                onChange={(e) => 
                    updateStatus({
                        variables: {
                        jobId: Number(job.id),
                        newStatus: e.target.value,
                        },
                    })
                }
                className="ml-2 border p-1 rounded"
            >
                <option value="pending_quote">Pending Quote</option>
                <option value="quote_scheduled">Quote Scheduled</option>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
            </select>
        </div>
        
    );
}