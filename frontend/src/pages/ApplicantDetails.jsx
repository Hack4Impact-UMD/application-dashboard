import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplicantDetails.css';

const ApplicantDetails = ({ applicants }) => {
  const { id } = useParams(); // Get the applicant ID from the URL
  const navigate = useNavigate();

  const applicant = applicants.find((app) => app.id === parseInt(id));

  if (!applicant) {
    return <p>Applicant not found.</p>;
  }

  return (
    <div className="applicant-details">
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
        Back to Applicants
      </button>
      <h2>{applicant.name}'s Application</h2>
      <p><strong>Email:</strong> {applicant.email}</p>
      <p><strong>Status:</strong> {applicant.status}</p>
      <p><strong>Date Applied:</strong> {applicant.dateApplied}</p>
      <p><strong>Roles:</strong> {applicant.roles.join(', ')}</p>
      <p><strong>Application Score:</strong> {applicant.applicationScore || '-'}</p>
      <p><strong>Interview Score:</strong> {applicant.interviewScore || '-'}</p>
      <p><strong>Overall Score:</strong> {applicant.overallScore || '-'}</p>
      <p><strong>Application Details:</strong> {applicant.applicationDetails}</p>
    </div>
  );
};

export default ApplicantDetails;
