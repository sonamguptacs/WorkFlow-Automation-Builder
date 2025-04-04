import WorkflowBuilder from "./components/WorkFlowBuilder";
import { WorkflowProvider } from "./context/WorkFlowContext";
import "reactflow/dist/style.css";

export default function App() {
  return (
    <WorkflowProvider>
      <WorkflowBuilder />
    </WorkflowProvider>
  );
}
