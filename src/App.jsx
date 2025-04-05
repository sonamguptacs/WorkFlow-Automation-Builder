// App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ReactFlowProvider } from 'reactflow'
import { WorkflowBuilder } from './components/WorkFlowBuilder'
import { FlowProvider } from './context/WorkFlowContext'
import styled from 'styled-components'
import { WorkFlowTable } from './pages/WorkFlowTable'

const Nav = styled.nav`
  background-color: #f8f9fa;
  display: flex;
  gap: 10px;

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    padding: 10px;
  }
`

export default function App() {
  return (
    <Router>
      <ReactFlowProvider>
        <FlowProvider>
          <Nav>
            <Link to="/">Builder</Link>
            <Link to="/workFlowTable">WorkFlowTable</Link>
          </Nav>
          <Routes>
            <Route path="/" element={<WorkflowBuilder />} />
            <Route path="/workFlowTable" element={<WorkFlowTable />} />
          </Routes>
        </FlowProvider>
      </ReactFlowProvider>
    </Router>
  )
}
