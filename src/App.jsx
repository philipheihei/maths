import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AngleQuiz from './components/AngleQuiz';
import CircleTheorems from './components/CircleTheorems';
import IdentityQuiz from './components/IdentityQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/angle-quiz" element={<AngleQuiz />} />
        <Route path="/circle-theorems" element={<CircleTheorems />} />
        <Route path="/identity-quiz" element={<IdentityQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
