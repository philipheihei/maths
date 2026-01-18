import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AngleQuiz from './apps/AngleQuiz';
import CircleTheorems from './apps/CircleTheorems';
import IdentityQuiz from './apps/IdentityQuiz';
import SimultaneousEqQuiz from './apps/SimultaneousEqQuiz';
import IndexLaws from './apps/IndexLaws';
import DispersionQuiz from './apps/DispersionQuiz';
import InequalityQuiz from './apps/InequalityQuiz';
import CompoundInequalityQuiz from './apps/CompoundInequalityQuiz';
import VariationQuiz from './apps/VariationQuiz';
import Subject from './apps/Subject/index';

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
        <Route path="/inequality-quiz" element={<InequalityQuiz />} />
        <Route path="/compound-inequality-quiz" element={<CompoundInequalityQuiz />} />
        <Route path="/variation-quiz" element={<VariationQuiz />} />
        <Route path="/subject" element={<Subject />} />
      </Routes>
    </Router>
  );
}

export default App;
