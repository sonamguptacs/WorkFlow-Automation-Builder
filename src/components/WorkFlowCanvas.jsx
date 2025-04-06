import React, { useState, useRef } from 'react'
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
    setEdges,
  } = useFlowContext()

  const [connectStartNode, setConnectStartNode] = useState(null)
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

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

      return [...prev, newNode]
    })
  }

  const reset = () => {
    setNodes([
      {
        id: '1',
        type: 'task',
        position: { x: 50, y: 50 },
        data: { label: 'Start' },
      },
    ])
    setNodeType('task')
  }

  const onConnectStart = (_, { nodeId }) => {
    setConnectStartNode(nodeId)
  }

  const onConnectEnd = (event) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    const newNodeId = `${Date.now()}`

    const newNode = {
      id: newNodeId,
      type: nodeType,
      position,
      data: { label: nodeType },
    }

    setNodes((nds) => [...nds, newNode])
    setEdges((eds) => [
      ...eds,
      {
        id: `e${connectStartNode}-${newNodeId}`,
        source: connectStartNode,
        target: newNodeId,
        type: nodeType,
      },
    ])

    setConnectStartNode(null)
  }

  return (
    <React.Fragment>
      <Toolbar>
        <select onChange={(e) => setNodeType(e.target.value)} value={nodeType}>
          <option value="task">Task</option>
          <option value="condition">Condition</option>
          <option value="notification">Notification</option>
        </select>
        <Button onClick={handleAdd}>Add Node</Button>
        <Button onClick={undo}>Undo</Button>
        <Button onClick={redo}>Redo</Button>
        <Button onClick={reset}>Reset</Button>
      </Toolbar>
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          onInit={setReactFlowInstance}
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
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </React.Fragment>
  )
}
