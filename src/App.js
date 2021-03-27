import React from "react";
import { AuthProvider } from "./Service/Context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./Service/Router/AppRoute";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ProgressProvider } from "./Service/Context/ProgressContext";

function App() {
  return (
      <ProgressProvider>
        <AuthProvider>
            <Router>
              <AppRoute />
            </Router>
            <ToastContainer />
        </AuthProvider>
      </ProgressProvider>
  );
}

export default App;
