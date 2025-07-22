import "./App.css";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReposProvider from "./store/ReposContext";

function App() {
  return (
    <ReposProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/repo/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </ReposProvider>
  );
}

export default App;
