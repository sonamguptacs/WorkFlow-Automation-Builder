import WorkflowCanvas from "./WorkFlowCanvas";
import WorkflowForm from "./WorkFlowForm";

const WorkFlowBuilder = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <WorkflowCanvas />
      <WorkflowForm />
    </div>
  );
};

export default WorkFlowBuilder;
