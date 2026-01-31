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
import Subject from './apps/Subject';
import CoordinateTransform from './apps/CoordinateTransform';
import AlgebraicFractionsQuiz from './apps/AlgebraicFractionsQuiz';
import ApproximationQuiz from './apps/ApproximationQuiz';
import PercentageQuiz from './apps/PercentageQuiz';
import ProbabilityQuiz from './apps/ProbabilityQuiz';
import FactorizationQuiz from './apps/FactorizationQuiz';

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
        <Route path="/coordinate-transform" element={<CoordinateTransform />} />
        <Route path="/algebraic-fractions" element={<AlgebraicFractionsQuiz />} />
        <Route path="/approximation-quiz" element={<ApproximationQuiz />} />
        <Route path="/percentage-quiz" element={<PercentageQuiz />} />
        <Route path="/probability-quiz" element={<ProbabilityQuiz />} />
        <Route path="/factorization-quiz" element={<FactorizationQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
