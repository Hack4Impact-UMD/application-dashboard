import { useState } from "react";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import FilterBar from "../components/FilterBar";
import DataTable from "../components/DataTable";

const mockApplicants = [
  {
    id: 1,
    name: "Nya Kassa",
    email: "akassa@gmail.com",
    status: "App. Completed",
    dateApplied: "2024-11-02",
    roles: ["TL", "Er"],
    applicationScore: null,
    interviewScore: null,
    overallScore: null,
  },
];

const ApplicantReview = () => {
  const [search, setSearch] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState(mockApplicants);

  const handleSearch = (query) => {
    setSearch(query);
    setFilteredApplicants(
      mockApplicants.filter((applicant) =>
        applicant.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Applicant Review Portal</h1>
        <ProgressBar finalized={195} total={200} />
        <FilterBar onSearch={handleSearch} />
        <DataTable applicants={filteredApplicants} />
      </div>
    </div>
  );
};

export default ApplicantReview;
