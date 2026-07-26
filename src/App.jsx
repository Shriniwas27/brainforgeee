import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import MultiplayerHub from "./pages/MultiplayerHub";
import RoomLeaderboard from "./pages/RoomLeaderboard";
import CodingWorkspace from "./pages/CodingWorkspace";
import ContributionStudio from "./pages/ContributionStudio";
import ProblemsList from "./pages/ProblemsList";
import ProfileStats from "./pages/ProfileStats";
import CreateTest from "./pages/CreateTest";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const showSidebar = !["/signup", "/login"].includes(location.pathname);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background text-on-background transition-colors duration-200">
      {showSidebar && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/rooms" element={<MultiplayerHub />} />
          <Route path="/rooms/:roomId/leaderboard" element={<RoomLeaderboard />} />
          <Route path="/problems" element={<ProblemsList />} />
          <Route path="/problems/:problemId" element={<CodingWorkspace />} />
          <Route path="/studio" element={<ContributionStudio />} />
          <Route path="/profile" element={<ProfileStats />} />
          <Route path="/create-test" element={<CreateTest />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
