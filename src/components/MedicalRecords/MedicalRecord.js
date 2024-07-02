import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { usePatients } from '../../utils/PatientContext';
import { useMedicalRecords } from '../../utils/MedicalRecordContext';

function MedicalRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPatient } = usePatients();
  const { addMedicalRecord, getPatientMedicalRecords } = useMedicalRecords();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ diagnosis: '', treatment: '', notes: '' });

  useEffect(() => {
    const patientData = getPatient(parseInt(id));
    if (patientData) {
      setPatient(patientData);
      setRecords(getPatientMedicalRecords(parseInt(id)));
    } else {
      navigate('/patients');
    }
  }, [id, getPatient, getPatientMedicalRecords, navigate]);

  const handleNewRecordChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    addMedicalRecord(patient.id, newRecord);
    setNewRecord({ diagnosis: '', treatment: '', notes: '' });
    setRecords(getPatientMedicalRecords(patient.id));
  };

  if (!patient) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4">Medical Records for {patient.name}</Typography>
      <form onSubmit={handleAddRecord}>
        <TextField
          name="diagnosis"
          label="Diagnosis"
          value={newRecord.diagnosis}
          onChange={handleNewRecordChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="treatment"
          label="Treatment"
          value={newRecord.treatment}
          onChange={handleNewRecordChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="notes"
          label="Notes"
          value={newRecord.notes}
          onChange={handleNewRecordChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Record
        </Button>
      </form>
      <Typography variant="h5" style={{ marginTop: '20px' }}>Medical History</Typography>
      <List>
        {records.sort((a, b) => new Date(b.date) - new Date(a.date)).map((record) => (
          <ListItem key={record.id}>
            <ListItemText
              primary={record.diagnosis}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    Date: {new Date(record.date).toLocaleDateString()}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textPrimary">
                    Treatment: {record.treatment}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textPrimary">
                    Notes: {record.notes}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default MedicalRecord;
