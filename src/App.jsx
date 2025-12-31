import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  // ✅ 改成 pages
import AngleQuiz from './apps/AngleQuiz';  // ✅ 改成 apps
import CircleTheorems from './apps/CircleTheorems';  // ✅ 改成 apps
import IdentityQuiz from './apps/IdentityQuiz';  // ✅ 改成 apps
import SimultaneousEqQuiz from './apps/SimultaneousEqQuiz';
import IndexLaws from './apps/IndexLaws';
import DispersionQuiz from './apps/DispersionQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/angle-quiz" element={<AngleQuiz />} />
        <Route path="/circle-theorems" element={<CircleTheorems />} />
        <Route path="/identity-quiz" element={<IdentityQuiz />} />
        <Route path="/simultaneous-eq-quiz" element={<SimultaneousEqQuiz />} />
        <Route path="/index-laws" element={<IndexLaws />} />
        <Route path="/dispersion-quiz" element={<DispersionQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
