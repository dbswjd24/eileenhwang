import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Experiences from './pages/Experiences';
import CsProjects from './pages/CsProjects';
import DesignProjects from './pages/DesignProjects';
import Hackathons from './pages/Hackathons';
import Designathons from './pages/Designathons';
import AudioLens from './pages/AudioLens';
import SmartTodo from './pages/SmartTodo';
import Unetic from './pages/Unetic';
import BusCheck from './pages/BusCheck';
import Womp from './pages/Womp';
import GoodNotes from './pages/GoodNotes';
import Food from './pages/Food';
import PathPilot from './pages/PathPilot';

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
        <Route path="/projects/audiolens" element={<AudioLens />} />
        <Route path="/projects/smarttodo" element={<SmartTodo />} />
        <Route path="/projects/unetic" element={<Unetic />} />
        <Route path="/projects/bus" element={<BusCheck />} />
        <Route path="/projects/womp" element={<Womp />} />
        <Route path="/projects/goodnotes" element={<GoodNotes />} />
        <Route path="/projects/food" element={<Food />} />
        <Route path="/projects/pathpilot" element={<PathPilot />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
