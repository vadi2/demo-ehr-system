import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Button } from '@mui/material';
import { AuthProvider, useAuth } from './utils/AuthContext';
import { PatientProvider } from './utils/PatientContext';
import { MedicalRecordProvider } from './utils/MedicalRecordContext';
import { AuditLogProvider } from './utils/AuditLogContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Auth/Login';
import PatientList from './components/PatientManagement/PatientList';
import PatientProfile from './components/PatientManagement/PatientProfile';
import MedicalRecord from './components/MedicalRecords/MedicalRecord';

function Header() {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>EHR System</Typography>
        {user && (
          <Button color="inherit" onClick={logout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuditLogProvider>
        <PatientProvider>
          <MedicalRecordProvider>
            <Router>
              <CssBaseline />
              <Header />
              <Container>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/patients"
                    element={
                      <ProtectedRoute allowedRoles={['doctor', 'nurse']}>
                        <PatientList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/patients/:id"
                    element={
                      <ProtectedRoute allowedRoles={['doctor', 'nurse']}>
                        <PatientProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/records/:id"
                    element={
                      <ProtectedRoute allowedRoles={['doctor']}>
                        <MedicalRecord />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/" element={<Navigate replace to="/login" />} />
                </Routes>
              </Container>
            </Router>
          </MedicalRecordProvider>
        </PatientProvider>
      </AuditLogProvider>
    </AuthProvider>
  );
}

export default App;
