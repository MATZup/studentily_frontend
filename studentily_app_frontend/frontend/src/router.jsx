import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "./components/pages/homePage";
import JournalPage from "./components/pages/journalPage";
import NotesPage from "./components/pages/notesPage";
import PomodoroPage from "./components/pages/pomodoroPage";
import TodosPage from "./components/pages/todosPage";
import LoginPage from "./components/auth/Login";
import RegistrationPage from "./components/auth/Registration";

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  if (checkingAuth) {
    return <div>Loading...</div>; // Während der Auth-Prüfung wird "Loading..." angezeigt
  }

  // Private Route Komponente
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  // Public Route Komponente
  const PublicRoute = ({ element }) => {
    return isAuthenticated ? <Navigate to="/" /> : element;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/register"
          element={<RegistrationPage setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        <Route
          path="/journal"
          element={<PrivateRoute element={<JournalPage />} />}
        />
        <Route
          path="/notes"
          element={<PrivateRoute element={<NotesPage />} />}
        />
        <Route
          path="/pomodoro"
          element={<PrivateRoute element={<PomodoroPage />} />}
        />
        <Route
          path="/todos"
          element={<PrivateRoute element={<TodosPage />} />}
        />

        {/* Fallback für unbekannte Routes */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
