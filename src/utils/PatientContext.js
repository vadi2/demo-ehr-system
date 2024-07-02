import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const PatientContext = createContext(null);

const API_BASE_URL = 'http://localhost:8080/api/patients';

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients when the component mounts
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const addPatient = async (patient) => {
    try {
      const response = await axios.post(API_BASE_URL, patient);
      setPatients([...patients, response.data]);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const updatePatient = async (id, updatedPatient) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedPatient);
      setPatients(patients.map(p => p.id === id ? response.data : p));
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setPatients(patients.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const getPatient = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient, deletePatient, getPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => useContext(PatientContext);
