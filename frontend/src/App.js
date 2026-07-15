import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CommandLayout from "@/layouts/CommandLayout";
import Hero from "@/pages/Hero";
import Opord from "@/pages/Opord";
import ROE from "@/pages/ROE";
import Dodatki from "@/pages/Dodatki";
import Satellite from "@/pages/Satellite";
import Equipment from "@/pages/Equipment";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <BrowserRouter>
        <Routes>
          <Route element={<CommandLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/opord" element={<Opord />} />
            <Route path="/roe" element={<ROE />} />
            <Route path="/dodatki" element={<Dodatki />} />
            <Route path="/dodatki/satelita" element={<Satellite />} />
            <Route path="/dodatki/ekwipunek" element={<Equipment />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
