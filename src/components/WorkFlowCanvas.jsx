import React, { useState } from 'react'
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
    selectedNode,
    deleteNodeOrEdge,
    addNodeAtPosition,
    setEditNode,
  } = useFlowContext()

  const [nodeType, setNodeType] = useState('task')
  const [isAdding, setIsAdding] = useState(false)

  const handlePaneClick = (e) => {
    if (!isAdding) return
    const bounds = e.target.getBoundingClientRect()
    const position = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    }
    addNodeAtPosition(position, nodeType)
    setIsAdding(false)
  }

  return (
    <React.Fragment>
      <Toolbar>
        <select onChange={(e) => setNodeType(e.target.value)} value={nodeType}>
          <option value="task">Task</option>
          <option value="approval">Approval</option>
          <option value="delay">Delay</option>
        </select>
        <Button onClick={() => setIsAdding(true)}>Add Node</Button>
        <Button onClick={undo}>Undo</Button>
        <Button onClick={redo}>Redo</Button>
        {selectedNode && (
          <React.Fragment>
            <Button onClick={() => deleteNodeOrEdge(selectedNode.id, 'node')}>
              Delete Node
            </Button>
            <Button onClick={() => setEditNode(selectedNode.id)}>
              Edit Node
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={handlePaneClick}
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
