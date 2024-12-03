import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../config/firebase';  // Import your firebase configuration
import { doc, getDoc } from 'firebase/firestore';
import './ApplicantDetails.css';

const ApplicantDetails = () => {
  const { id } = useParams();  // Get the applicant ID from the URL
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const applicantDocRef = doc(db, 'users', id); // Firestore reference
        const docSnap = await getDoc(applicantDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // Convert Firestore Timestamp to a Date string if it's a timestamp field
          const dateApplied = data.dateApplied ? data.dateApplied.toDate().toLocaleDateString() : null;

          // Calculate overall score by summing applicationScore and interviewScore
          const applicationScore = data.applicationScore || 0;  // Default to 0 if not available
          const interviewScore = data.interviewScore || 0;      // Default to 0 if not available
          const overallScore = applicationScore + interviewScore;

          // Update the applicant object with the formatted date and overall score
          setApplicant({ ...data, dateApplied, overallScore });
        } else {
          console.log('Applicant not found');
        }
      } catch (error) {
        console.error('Error fetching applicant:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplicant();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!applicant) {
    return <div>Applicant not found.</div>;
  }

  return (
    <div className="applicant-details">
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          marginLeft: '-1300px',
          marginTop: '80px',
          color: 'gray',
          cursor: 'pointer',
          fontFamily: 'Karla',
          fontSize: '16px',
        }}
      >
        ← Back to Applicants
      </Link>

      <img src="/src/assets/Header.jpg" alt="Header" className="navbar-header-image" />
      <header>
        <div className="banner"></div>
      </header>
      <div className="applicant-name">{applicant.name}</div>
      <p><strong>Email:</strong> {applicant.email}</p>
      <p><strong>Status:</strong> {applicant.status}</p>
      <p><strong>Date Applied:</strong> {applicant.dateApplied}</p>
      <p><strong>Roles:</strong> {applicant.roles.join(', ')}</p>
      <p><strong>Application Score:</strong> {applicant.applicationScore || '-'}</p>
      <p><strong>Interview Score:</strong> {applicant.interviewScore || '-'}</p>
      <p><strong>Overall Score:</strong> {applicant.overallScore}</p> {/* Display the calculated overall score */}
      <p><strong>Application Details:</strong> {applicant.applicationDetails}</p>
    </div>
  );
};

export default ApplicantDetails;
