import React from "react";
import { useWorkflow } from "../context/WorkFlowContext";

const WorkflowForm = () => {
  const { selectedNode } = useWorkflow();

  if (!selectedNode) return null;

  return <React.Fragment>WorkFlow Form</React.Fragment>;
};

export default WorkflowForm;
