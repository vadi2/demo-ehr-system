// src/utils/AuditLogContext.js
import React, { createContext, useState, useContext } from 'react';

const AuditLogContext = createContext(null);

export const AuditLogProvider = ({ children }) => {
  // We're keeping logs in state for potential future use (e.g., displaying logs in the UI)
  // eslint-disable-next-line no-unused-vars
  const [logs, setLogs] = useState([]);

  const addLog = (action, details) => {
    const newLog = {
      timestamp: new Date().toISOString(),
      action,
      details
    };
    setLogs(prevLogs => [...prevLogs, newLog]);
    // In a real application, you might want to send this log to a server
    console.log('Audit Log:', newLog);
  };

  return (
    <AuditLogContext.Provider value={{ addLog }}>
      {children}
    </AuditLogContext.Provider>
  );
};

export const useAuditLog = () => useContext(AuditLogContext);
