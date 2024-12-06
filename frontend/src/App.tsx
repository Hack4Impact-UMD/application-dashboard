import { useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar';
import FilterBar from './components/FilterBar';
import DataTable from './components/DataTable';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicantDetails from './pages/ApplicantDetails';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';


// Mock data for the applicant table
const mockApplicants = [
  {
    id: 1,
    name: 'Nya Kassa',
    email: 'akassa@gmail.com',
    status: 'App. Completed',
    dateApplied: '2024-11-08',
    roles: ['TL', 'Er'],
    applicationScore: null,
    interviewScore: null,
    overallScore: null,
  },
  {
    id: 2,
    name: 'Kenya Parr',
    email: 'k.parr@terpmail.umd.com',
    status: 'Interview Offered',
    dateApplied: '2024-11-03',
    roles: ['Sg', 'Ds', 'PM'],
    applicationScore: '12/12',
    interviewScore: null,
    overallScore: null,
  },
  {
    id: 3,
    name: 'Kayla Singh',
    email: 'k.singh@terpmail.umd.com',
    status: 'Interview Conducted',
    dateApplied: '2024-11-05',
    roles: ['TL', 'Er'],
    applicationScore: '11/12',
    interviewScore: null,
    overallScore: null,
  },
];

type Applicant = {
  id: string;
  name: string;
  email: string;
  status: string;
  dateApplied: string;
  roles: string[];
  applicationScore: string | null;
  interviewScore: string | null;
  overallScore: string | null;
};


function App() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [allApplicants, setAllApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const applicantsCollection = collection(db, 'users');
        const applicantsSnapshot = await getDocs(applicantsCollection);
        console.log('Fetching documents from the "users" collection...');
        applicantsSnapshot.docs.forEach((doc) => {
          console.log('Document ID:', doc.id); 
        });
        const applicantsList: Applicant[] = applicantsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Applicant[];
        setApplicants(applicantsList);
        setAllApplicants(applicantsList);
        setFilteredApplicants(applicantsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        setLoading(false);
      }
    };
  
    fetchApplicants();
  }, []);
  

  const handleSearch = (query) => {
    setSearch(query);
    filterApplicants(query, selectedRole);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    filterApplicants(search, role);
  };

  const finalizedApplicants = applicants.filter((applicant) => {
    return ![
      'App. Completed',
      'Interview Conducted',
      'Interview Offered',
    ].includes(applicant.status);
  });

  const filterApplicants = (query: string, role: string) => {
    const filtered = applicants.filter((applicant) => {
      const matchesQuery = applicant.name.toLowerCase().includes(query.toLowerCase()) ||
                           applicant.email.toLowerCase().includes(query.toLowerCase());

      const matchesRole = role ? applicant.roles.includes(role) : true;

      return matchesQuery && matchesRole;
    });
    setFilteredApplicants(filtered);
  };

  const handleSortByDate = () => {
    const sortedApplicants = [...filteredApplicants].sort((a, b) => {
      const dateA = a.dateApplied && a.dateApplied.toDate ? a.dateApplied.toDate() : new Date(0); // Default to an old date if no date exists
      const dateB = b.dateApplied && b.dateApplied.toDate ? b.dateApplied.toDate() : new Date(0); // Same as above
  
      return dateA - dateB;  
    });
    setFilteredApplicants(sortedApplicants);
  };
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <img src="/src/assets/Header.jpg" alt="Header" className="navbar-header-image" />
                <header>
                  <div className="banner"></div>
                  <h1>Applicant Review Portal</h1>
                </header>
                <div className="styled-box">
                  <div className="box-header">
                    <h2 className="box-title">Number of Applicants:</h2>
                    <h2 className="box-title">Applicants Finalized</h2>
                  </div>
                  <ProgressBar finalized={finalizedApplicants.length} total={allApplicants.length} />
                  <div className="numbers">
                    <span className="applicants-count">{allApplicants.length}</span>
                    <span className="finalized-count">{finalizedApplicants.length}</span>
                  </div>
                </div>
                <main className="container mx-auto p-4">
                  <FilterBar
                    onSearch={handleSearch}
                    onSortByDate={handleSortByDate}
                    onRoleFilter={handleRoleFilter}
                    selectedRole={selectedRole}
                  />
                  {loading ? (
                    <p>Loading applicants...</p>
                  ) : (
                    <DataTable applicants={filteredApplicants} />
                  )}
                </main>
              </>
            }
          />
          <Route path="/applicant/:id" element={<ApplicantDetails applicants={applicants} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;