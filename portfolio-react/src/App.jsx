import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Experiences from './pages/Experiences';
import CsProjects from './pages/CsProjects';
import DesignProjects from './pages/DesignProjects';
import Hackathons from './pages/Hackathons';
import Designathons from './pages/Designathons';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/projects/cs" element={<CsProjects />} />
        <Route path="/projects/design" element={<DesignProjects />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/designathons" element={<Designathons />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
