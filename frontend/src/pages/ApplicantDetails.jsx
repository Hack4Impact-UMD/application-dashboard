import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../config/firebase';  
import { doc, getDoc } from 'firebase/firestore';
import './ApplicantDetails.css';

const ApplicantDetails = () => {
  const { id } = useParams(); 
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const applicantDocRef = doc(db, 'users', id);
        const docSnap = await getDoc(applicantDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          
          const dateApplied = data.dateApplied ? data.dateApplied.toDate().toLocaleDateString() : null;
          const applicationScore = data.applicationScore || 0;
          const interviewScore = data.interviewScore || 0; 
          const overallScore = applicationScore + interviewScore;

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

  // Function to render rubric for each role
  const renderRubric = (role) => {
    // Mapping role codes to their full names
    const roleNames = {
      'Er': 'Engineer',
      'TL': 'Tech Lead',
      'Sg': 'Sourcing',
      'Ds': 'Designer',
      'PM': 'Project Manager',
      'BP': 'Bootcamp Program'
    };

    const roleName = roleNames[role] || role; // Default to role code if not found

    const engineerQuestions = (
      <>
        <div className="score-category">
          <div className='rubric-questions'>Functionality</div>
          <div className="radio-buttons">
            {[1, 2, 3, 4].map((score) => (
              <label key={`problem-solving-${score}`}>
                <input type="radio" name={`problem-solving-${role}`} value={score} />
                {score}
              </label>
            ))}
          </div>
        </div>
        <div className="score-category">
          <div className='rubric-questions'>Visual</div>
          <div className="radio-buttons">
            {[1, 2, 3, 4].map((score) => (
              <label key={`coding-experience-${score}`}>
                <input type="radio" name={`coding-experience-${role}`} value={score} />
                {score}
              </label>
            ))}
          </div>
        </div>
        <div className="score-category">
          <div className='rubric-questions'>Coding Practices</div>
          <div className="radio-buttons">
            {[1, 2, 3, 4].map((score) => (
              <label key={`coding-experience-${score}`}>
                <input type="radio" name={`coding-experience-${role}`} value={score} />
                {score}
              </label>
            ))}
          </div>
        </div>
        <div className="score-category">
          <div className='rubric-questions'>Coding Style</div>
          <div className="radio-buttons">
            {[1, 2, 3, 4].map((score) => (
              <label key={`coding-experience-${score}`}>
                <input type="radio" name={`coding-experience-${role}`} value={score} />
                {score}
              </label>
            ))}
          </div>
        </div>
        <div className="score-category">
          <div className='rubric-questions'>Bonus</div>
          <div className="radio-buttons">
            {[1, 2, 3, 4].map((score) => (
              <label key={`coding-experience-${score}`}>
                <input type="radio" name={`coding-experience-${role}`} value={score} />
                {score}
              </label>
            ))}
          </div>
        </div>
      </>
    );

    // Default questions for other roles
    const defaultQuestions = (
      <>
        <div className="score-category">
          <div className='rubric-questions'>Interest in Club:</div>
          <div className="radio-buttons">
            {[1, 2, 3, 4].map((score) => (
              <label key={`club-${score}`}>
                <input type="radio" name={`interestInClub-${role}`} value={score} />
                {score}
              </label>
            ))}
          </div>
        </div>
        <div className="score-category">
          <div className='rubric-questions'>Interest in Social Good:</div>
          <div className="radio-buttons">
            {[1, 2, 3, 4].map((score) => (
              <label key={`social-${score}`}>
                <input type="radio" name={`interestInSocialGood-${role}`} value={score} />
                {score}
              </label>
            ))}
          </div>
        </div>
        <div className="score-category">
          <div className='rubric-questions'>Technical Expertise:</div>
          <div className="radio-buttons">
            {[1, 2, 3, 4].map((score) => (
              <label key={`technical-${score}`}>
                <input type="radio" name={`technicalExpertise-${role}`} value={score} />
                {score}
              </label>
            ))}
          </div>
        </div>
      </>
    );

    return (
      <div className="rubric-box">
        <div className="bigger-header">{roleName} Application Rubric</div>
        <a href="/rubric" target="_blank" className="rubric-link">Rubric Link</a>

        {roleName === 'Engineer' ? engineerQuestions : defaultQuestions}
      </div>
    );
  };

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

      <div className="applicant-details-wrapper">
        {/* General Information */}
        <div className="general-questions-box">
          <div className='bigger-header'>H4I New Member</div>
          <div className='bigger-header'>Application Spring 2025</div>
          <div className="mini-header">General Questions</div>
          <div className='question-headers'>Email</div>
          <div className='question-answers'>{applicant.email}</div>
          <div className='question-headers'>Full Name</div>
          <div className='question-answers'>{applicant.name}</div>
          <div className='question-headers'>Preferred Name</div>
          <div className='question-answers'>{applicant.preferred || '-'}</div>
          <div className='question-headers'>Year in School</div>
          <div className='question-answers'>{applicant.year}</div>
          <div className='question-headers'>Major</div>
          <div className='question-answers'>{applicant.major}</div>
          <div className='question-headers'>Minor(s)</div>
          <div className='question-answers'>{applicant.minor}</div>
          <div className='question-headers'>What CS classes have you taken?</div>
          <div className='question-answers'>
            {applicant.classes && applicant.classes.length > 0 ? (
              applicant.classes.map((cls, index) => (
                <div key={index}>{cls}</div>
              ))
            ) : (
              <p>No classes listed</p>
            )}
          </div>
          <div className='question-headers'>Technical Skills</div>
          <div className='question-answers'>
            {applicant.skills && applicant.skills.length > 0 ? (
              applicant.skills.map((cls, index) => (
                <div key={index}>{cls}</div>
              ))
            ) : (
              <p>No classes listed</p>
            )}
          </div>
        </div>

        {/* Roles and Rubrics */}
        <div className="tech-lead-scores-box">
          {/* Dynamically Display Rubrics for Each Role */}
          {applicant.roles && applicant.roles.map((role, index) => (
            <div key={index}>
              {renderRubric(role)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
