import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Home from "./pages/Home"; 
import MapInterface from "./pages/MapInterface"; 
import MapInterface2 from "./pages/MapInterface2"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mapinterface" element={<MapInterface />} />
        <Route path="/mapinterface2" element={<MapInterface2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
