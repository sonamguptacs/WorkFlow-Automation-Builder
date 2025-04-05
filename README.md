# Workflow Automation Builder

A React-based workflow builder for creating, editing, and managing custom workflow automations. This app provides a drag-and-drop interface to connect and configure nodes such as tasks, approvals, and delays.

## Features

-  **Three Node Types**: Task, Approval, Delay.
-  **Inline Controls**: Add, edit, or delete directly on each node.
-  **Side Panel Configuration**: Click a node to open a React Hook Form to configure Task Name, Assignee, and Due Date.
-  **Summary Table**: View and edit all nodes in a tabular format with filtering and editing using React Table.
-  **Undo/Redo Support**: Revert or reapply actions like adding or deleting nodes/edges.
-  **Styled Components**: Clean and responsive UI styled using `styled-components`.
-  **Context API**: Centralized state management with React Context.

---

##  Installation & Setup

```bash
# 1. Clone the repository
https://github.com/sonamguptacs/WorkFlow-Automation-Builder.git

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

---

##  Project Structure

```
src/
├── components/          # Node components, Side panel form, Summary table
├── context/             # React Context for workflow state
├── pages/               # Builder view and Summary view
├── App.jsx
└── index.jsx
```

---

##  Screenshots

- **Workflow Builder:** Drag and visually connect task nodes
- **Node Form Panel:** Configure details like Task Name, Assignee, and Due Date
- **Summary Table:** Edit details inline

---

##  Build for Production

```bash
npm run build
```

---

##  Tech Stack

- React
- React Flow
- React Hook Form
- React Table
- React Router DOM
- Styled Components

---

## 📄 License
[MIT](LICENSE)

