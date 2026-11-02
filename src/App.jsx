import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("devsolve-authenticated") === "true"
  );
  const isAuthPage = ["/signup", "/login"].includes(location.pathname);
  const showSidebar = isAuthenticated && !isAuthPage;
  const signIn = () => {
    localStorage.setItem("devsolve-authenticated", "true");
    setIsAuthenticated(true);
  };
  const signOut = () => {
    localStorage.removeItem("devsolve-authenticated");
    setIsAuthenticated(false);
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background text-on-background transition-colors duration-200">
      {showSidebar && <Sidebar onSignOut={signOut} />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp onAuthenticated={signIn} />} />
          <Route path="/login" element={<SignUp onAuthenticated={signIn} />} />
          <Route path="/rooms" element={isAuthenticated ? <MultiplayerHub /> : <Navigate to="/signup" replace />} />
          <Route path="/rooms/:roomId/leaderboard" element={isAuthenticated ? <RoomLeaderboard /> : <Navigate to="/signup" replace />} />
          <Route path="/problems" element={isAuthenticated ? <ProblemsList /> : <Navigate to="/signup" replace />} />
          <Route path="/problems/:problemId" element={isAuthenticated ? <CodingWorkspace /> : <Navigate to="/signup" replace />} />
          <Route path="/studio" element={isAuthenticated ? <ContributionStudio /> : <Navigate to="/signup" replace />} />
          <Route path="/profile" element={isAuthenticated ? <ProfileStats /> : <Navigate to="/signup" replace />} />
          <Route path="/create-test" element={isAuthenticated ? <CreateTest /> : <Navigate to="/signup" replace />} />
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
