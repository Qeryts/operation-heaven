import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CommandLayout from "@/layouts/CommandLayout";
import Hero from "@/pages/Hero";
import Dashboard from "@/pages/Dashboard";
import Opord from "@/pages/Opord";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <BrowserRouter>
        <Routes>
          <Route element={<CommandLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/opord" element={<Opord />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
