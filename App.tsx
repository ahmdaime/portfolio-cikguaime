import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AutoErphPage from './pages/AutoErphPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auto-erph" element={<AutoErphPage />} />
    </Routes>
  );
}

export default App;
