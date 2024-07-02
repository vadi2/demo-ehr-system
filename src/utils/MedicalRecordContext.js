import React, { createContext, useState, useContext } from 'react';

const MedicalRecordContext = createContext(null);

export const MedicalRecordProvider = ({ children }) => {
  const [medicalRecords, setMedicalRecords] = useState({});

  const addMedicalRecord = (patientId, record) => {
    setMedicalRecords(prevRecords => ({
      ...prevRecords,
      [patientId]: [...(prevRecords[patientId] || []), { ...record, id: Date.now(), date: new Date().toISOString() }]
    }));
  };

  const updateMedicalRecord = (patientId, recordId, updatedRecord) => {
    setMedicalRecords(prevRecords => ({
      ...prevRecords,
      [patientId]: prevRecords[patientId].map(record =>
        record.id === recordId ? { ...record, ...updatedRecord } : record
      )
    }));
  };

  const getPatientMedicalRecords = (patientId) => {
    return medicalRecords[patientId] || [];
  };

  return (
    <MedicalRecordContext.Provider value={{ addMedicalRecord, updateMedicalRecord, getPatientMedicalRecords }}>
      {children}
    </MedicalRecordContext.Provider>
  );
};

export const useMedicalRecords = () => useContext(MedicalRecordContext);
