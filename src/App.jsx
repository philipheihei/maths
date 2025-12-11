import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AngleQuiz from './apps/AngleQuiz';
import CircleTheorems from './apps/CircleTheorems';
import IdentityQuiz from './apps/IdentityQuiz';
// 新增

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/angle-quiz" element={<AngleQuiz />} />
        <Route path="/circle-theorems" element={<CircleTheorems />} />
        <Route path="/circle-theorems" element={<CircleTheorems />} />  {/* 新增 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
