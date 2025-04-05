import React from 'react'
import ReactFlow, { Background, MiniMap, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { useFlowContext } from '../context/WorkFlowContext'
import { nodeTypes } from './CustomNodes'
import { Toolbar, Button } from './styledComponents'

export const WorkFlowCanvas = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    undo,
    redo,
    deleteNodeOrEdge,
    nodeType,
    setNodeType,
    setNodes,
    addNodeAtPosition,
  } = useFlowContext()

  const handleAdd = () => {
    setNodes((prev) => {
      const newId = `${Date.now()}`

      const position = { x: 0, y: 0 }

      const newNode = {
        id: newId,
        type: nodeType,
        position,
        data: { label: nodes.length > 0 ? nodeType : 'Start' },
      }

      addNodeAtPosition(position, newId, nodeType)

      return [...prev, newNode]
    })
  }

  return (
    <React.Fragment>
      <Toolbar>
        <select onChange={(e) => setNodeType(e.target.value)} value={nodeType}>
          <option value="task">Task</option>
          <option value="approval">Approval</option>
          <option value="delay">Delay</option>
        </select>
        <Button onClick={handleAdd}>Add Node</Button>
        <Button onClick={undo}>Undo</Button>
        <Button onClick={redo}>Redo</Button>
      </Toolbar>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={(event, edge) => {
          event.stopPropagation()
          deleteNodeOrEdge(edge.id, 'edge')
        }}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </React.Fragment>
  )
}
