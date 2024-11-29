import { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import FilterBar from './components/FilterBar';
import DataTable from './components/DataTable';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApplicantDetails from './pages/ApplicantDetails';


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

function App() {
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(''); 
  const [filteredApplicants, setFilteredApplicants] = useState(mockApplicants);
  
  const handleSearch = (query) => {
    setSearch(query);
    filterApplicants(query, selectedRole);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    filterApplicants(search, role); 
  };

  const filterApplicants = (query, role) => {
    const filtered = mockApplicants.filter((applicant) => {
      const matchesQuery = applicant.name.toLowerCase().includes(query.toLowerCase()) ||
                           applicant.email.toLowerCase().includes(query.toLowerCase());

      const matchesRole = role ? applicant.roles.includes(role) : true; 

      return matchesQuery && matchesRole;
    });
    setFilteredApplicants(filtered);
  };

  const handleSortByDate = () => {
    const sortedApplicants = [...filteredApplicants].sort((a, b) => {
      const dateA = new Date(a.dateApplied);
      const dateB = new Date(b.dateApplied);
      return dateA - dateB;  // Sort in ascending order
    });
    setFilteredApplicants(sortedApplicants);
  };

  return (
    <Router>
      
      <div className="App">
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
          <ProgressBar finalized={190} total={200} />
          <div className="numbers">
            <span className="applicants-count">200</span>
            <span className="finalized-count">190</span>
          </div>
        </div>
  
        <main className="container mx-auto p-4">
          <Routes>
            
            <Route
              path="/"
              element={
                <>
                  <FilterBar
                    onSearch={handleSearch}
                    onSortByDate={handleSortByDate}
                    onRoleFilter={handleRoleFilter}
                    selectedRole={selectedRole}
                  />
                  <DataTable applicants={filteredApplicants} />
                </>
              }
            />
            
            <Route path="/applicant/:id" element={<ApplicantDetails applicants={mockApplicants}/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
  
}

export default App;
