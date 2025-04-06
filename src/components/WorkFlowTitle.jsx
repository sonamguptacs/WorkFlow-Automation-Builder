import React, { useState } from 'react'
import styled from 'styled-components'
import { useFlowContext } from '../context/WorkFlowContext'

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #000;
  border-bottom: 1px solid #ddd;

  input {
    font-size: 20px;
    font-weight: 600;
    padding: 4px 8px;
    border: none;
    border-bottom: 2px solid transparent;
    background: transparent;
    text-align: center;
    width: 300px;
    color: #fff;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  @media (max-width: 600px) {
    input {
      font-size: 16px;
      width: 100%;
    }
  }
`

export const WorkflowTitle = () => {
  const { workflowName, setWorkflowName } = useFlowContext()
  const [value, setValue] = useState(workflowName)

  const handleBlur = () => setWorkflowName(value)

  return (
    <TitleWrapper>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        aria-label="Workflow Name"
      />
    </TitleWrapper>
  )
}
