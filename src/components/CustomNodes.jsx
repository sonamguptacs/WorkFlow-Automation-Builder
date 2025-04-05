import React from "react";

export const TaskNode = ({ data }) => (
  <div style={{ padding: 10, background: "#e0f7fa", borderRadius: 6 }}>
    <strong>📝 Task</strong>
    <br />
    {data.label}
  </div>
);

export const ApprovalNode = ({ data }) => (
  <div style={{ padding: 10, background: "#f3e5f5", borderRadius: 6 }}>
    <strong>✅ Approval</strong>
    <br />
    {data.label}
  </div>
);

export const DelayNode = ({ data }) => (
  <div style={{ padding: 10, background: "#fff3e0", borderRadius: 6 }}>
    <strong>⏳ Delay</strong>
    <br />
    {data.label}
  </div>
);

export const nodeTypes = {
  task: TaskNode,
  approval: ApprovalNode,
  delay: DelayNode,
};
