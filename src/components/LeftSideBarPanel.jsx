import React from 'react'
import styled from 'styled-components'

const SidebarWrapper = styled.div`
  width: 220px;
  min-width: 180px;
  background: #f9fbfc;
  border-right: 1px solid #dee2e6;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    position: absolute;
    top: auto;
    bottom: 50px;
    right: 0;
    left: 0;
    padding: 8px;
    border-radius: 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  @media (max-width: 480px) {
    display: none;
  }
`

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 16px;
  color: #333;
`

const DraggableNode = styled.div`
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #ccc;
  border-left: 6px solid ${(props) => props.borderColor || '#007bff'};
  border-radius: 6px;
  cursor: grab;
  font-weight: 500;
  color: #333;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    background: #eef6ff;
    border-left-color: ${(props) => props.hoverColor || '#0056b3'};
  }

  @media (max-width: 768px) {
    min-width: 120px;
    height: 20px;
    text-align: center;
    font-size: 14px;
    padding: 10px;
  }
`

export const LeftSideBarPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <SidebarWrapper>
      <Title>Toolbox</Title>

      <DraggableNode
        borderColor="#007bff"
        hoverColor="#0056b3"
        onDragStart={(e) => onDragStart(e, 'task')}
        draggable
      >
        📋 Task Node
      </DraggableNode>

      <DraggableNode
        borderColor="#f0ad4e"
        hoverColor="#d48806"
        onDragStart={(e) => onDragStart(e, 'condition')}
        draggable
      >
        ❓ Condition Node
      </DraggableNode>

      <DraggableNode
        borderColor="#28a745"
        hoverColor="#1e7e34"
        onDragStart={(e) => onDragStart(e, 'notification')}
        draggable
      >
        🔔 Notification Node
      </DraggableNode>
    </SidebarWrapper>
  )
}
