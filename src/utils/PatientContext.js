import React, { createContext, useState, useContext } from 'react';

const PatientContext = createContext(null);

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now() }]);
  };

  const updatePatient = (id, updatedPatient) => {
    setPatients(patients.map(p => p.id === id ? { ...p, ...updatedPatient } : p));
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const getPatient = (id) => {
    return patients.find(p => p.id === id);
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient, deletePatient, getPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => useContext(PatientContext);
