import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Experiment from "./components/Experiment";
import ChemistryLab from "./components/ChemistryLab"; // Import ChemistryLab component
import PhysicsLab from "./components/PhysicsLab";
import ElectronicsLab from "./components/ElectronicsLab";
import ChemistryLab1 from "./components/ChemistryLab1";
import PhysicsLab1 from "./components/PhysicsLab1";
import Student from "./components/Student";
import Teacher from "./components/Teacher";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route to LandingPage */}
          <Route path="/" element={<LandingPage />} />
          {/* Route to Experiments page */}
          <Route path="/experiments" element={<Experiment />} />
          {/* New Route to ChemistryLab */}
          <Route path="/chemistry" element={<ChemistryLab />} />
          <Route path="/physics" element={<PhysicsLab />} />
          <Route path="/electronics" element={<ElectronicsLab />} />
          <Route path="/chemistry1" element={<ChemistryLab1 />} />
          <Route path="/physics1" element={<PhysicsLab1 />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
