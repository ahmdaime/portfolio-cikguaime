import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './components/SplashScreen';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AutoErphPage = lazy(() => import('./pages/AutoErphPage'));
const ExtensionsLanding = lazy(() => import('./pages/ExtensionsLanding'));
const ExtensionsComingSoon = lazy(() => import('./pages/ExtensionsComingSoon'));

// Set to true to enable Extensions Landing page (for competition)
const EXTENSIONS_PAGE_ENABLED = false;

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auto-erph" element={<AutoErphPage />} />
          <Route path="/extensions" element={EXTENSIONS_PAGE_ENABLED ? <ExtensionsLanding /> : <ExtensionsComingSoon />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
