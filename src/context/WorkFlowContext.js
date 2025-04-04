import React, { createContext, useContext } from "react";

const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  return (
    <WorkflowContext.Provider value={{}}>{children}</WorkflowContext.Provider>
  );
};

export const useWorkflow = () => useContext(WorkflowContext);
