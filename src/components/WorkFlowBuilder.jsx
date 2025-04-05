import React from 'react'
import 'reactflow/dist/style.css'
import { Container } from './styledComponents'
import { WorkFlowForm } from './WorkFlowForm'
import { WorkFlowCanvas } from './WorkFlowCanvas'

export const WorkflowBuilder = () => {
  return (
    <Container>
      <WorkFlowCanvas />
      <WorkFlowForm />
    </Container>
  )
}
