import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AudioProvider } from './components/AudioProvider';
import Home from './pages/Home';
import { site } from './data/site';

const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Studios = lazy(() => import('./pages/Studios'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <AudioProvider>
      <Layout>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songwriting" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            {site.showStudios && <Route path="/studios" element={<Studios />} />}
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </AudioProvider>
  );
}
