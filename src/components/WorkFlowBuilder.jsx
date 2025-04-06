import React from 'react'
import 'reactflow/dist/style.css'
import { Container } from './styledComponents'
import { WorkFlowForm } from './WorkFlowForm'
import { WorkFlowCanvas } from './WorkFlowCanvas'
import { LeftSideBarPanel } from './LeftSideBarPanel'

export const WorkflowBuilder = () => {
  return (
    <Container>
      <LeftSideBarPanel />
      <WorkFlowCanvas />
      <WorkFlowForm />
    </Container>
  )
}
