import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DataTable.css';

const DataTable = ({ applicants }) => {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/applicant/${id}`);
    };

    const formatDate = (timestamp) => {
        if (timestamp && timestamp.toDate) {
            const date = timestamp.toDate();
            return date.toLocaleDateString(); 
        }
        return '-'; 
    };

    return (
        <table className="data-table">
            <thead>
                <tr>
                    <th className="table-header">Name</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Date Applied</th>
                    <th className="table-header">Role(s)</th>
                    <th className="table-header">Application Score</th>
                    <th className="table-header">Interview Score</th>
                    <th className="table-header">Overall Score</th>
                </tr>
            </thead>
            <tbody>
                {applicants.map((applicant) => (
                    <tr key={applicant.id} 
                        onClick={() => handleRowClick(applicant.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <td className="table-cell">{applicant.name}</td>
                        <td className="table-cell">{applicant.email}</td>
                        <td className="table-cell">{applicant.status}</td>
                        <td className="table-cell">{formatDate(applicant.dateApplied)}</td>
                        <td className="table-cell">{applicant.roles.join(', ')}</td>
                        <td className="table-cell">{applicant.applicationScore || '-'}</td>
                        <td className="table-cell">{applicant.interviewScore || '-'}</td>
                        <td className="table-cell">{applicant.overallScore || '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
