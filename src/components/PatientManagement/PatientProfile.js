import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';
import { usePatients } from '../../utils/PatientContext';
import { useAuditLog } from '../../utils/AuditLogContext';

function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPatient, updatePatient, deletePatient } = usePatients();
  const { addLog } = useAuditLog();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const patientData = getPatient(parseInt(id));
    if (patientData) {
      setPatient({
        ...patientData,
        contactNumber: patientData.contactNumber || ''
      });
    } else {
      navigate('/patients');
    }
  }, [id, getPatient, navigate]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatient = {
      ...patient,
      contactNumber: patient.contactNumber || ''
    };
    updatePatient(patient.id, updatedPatient);
    addLog('UPDATE_PATIENT', { patientId: patient.id });
    navigate('/patients');
  };

  const handleDelete = () => {
    deletePatient(patient.id);
    addLog('DELETE_PATIENT', { patientId: patient.id });
    navigate('/patients');
  };

  if (!patient) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4">Patient Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={patient.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={patient.dateOfBirth}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="contactNumber"
          label="Contact Number"
          value={patient.contactNumber || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete Patient
        </Button>
      </form>
    </Box>
  );
}

export default PatientProfile;
