import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AutoErphPage = lazy(() => import('./pages/AutoErphPage'));
const ExtensionsLanding = lazy(() => import('./pages/ExtensionsLanding'));

// Page loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center">
    <LoadingSpinner size="lg" text="Memuatkan halaman..." />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auto-erph" element={<AutoErphPage />} />
          <Route path="/extensions" element={<ExtensionsLanding />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
