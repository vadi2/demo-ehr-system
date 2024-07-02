import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { usePatients } from '../../utils/PatientContext';

function PatientList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { patients, addPatient } = usePatients();
  const navigate = useNavigate();

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    const germanFirstNames = ['Hans', 'Klaus', 'Dieter', 'Ursula', 'Helga', 'Ingrid', 'Wolfgang', 'Gerhard', 'Sabine', 'Monika'];
    const germanLastNames = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'];

    const randomFirstName = germanFirstNames[Math.floor(Math.random() * germanFirstNames.length)];
    const randomLastName = germanLastNames[Math.floor(Math.random() * germanLastNames.length)];
    const newPatient = { name: `${randomFirstName} ${randomLastName}`, dateOfBirth: '1990-01-01' };
    addPatient(newPatient);
  };

  return (
    <div>
      <Typography variant="h4">Patient List</Typography>
      <TextField
        label="Search Patients"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddPatient}>
        Add New Patient
      </Button>
      <List>
        {filteredPatients.map((patient) => (
          <ListItem
            key={patient.id}
            button
            onClick={() => navigate(`/patients/${patient.id}`)}
          >
            <ListItemText primary={patient.name} secondary={patient.dateOfBirth} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default PatientList;
