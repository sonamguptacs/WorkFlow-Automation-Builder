import React from 'react'
import ReactFlow, { Background, MiniMap, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { useFlowContext } from '../context/WorkFlowContext'
import { nodeTypes } from './CustomNodes'
import { Toolbar, Button } from './styledComponents'
import { useCanvasHooks } from './hooks/canvasHooks'
import { WorkflowTitle } from './WorkFlowTitle'

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
  } = useFlowContext()

  const {
    handleAdd,
    reset,
    onConnectStart,
    onConnectEnd,
    onDrop,
    onDragOver,
    setReactFlowInstance,
    reactFlowWrapper,
    handleImport,
    handleExport,
    fileInputRef,
  } = useCanvasHooks()
  return (
    <React.Fragment>
      <Toolbar>
        <Button onClick={handleAdd}>Add Node</Button>
        <select onChange={(e) => setNodeType(e.target.value)} value={nodeType}>
          <option value="task">Task</option>
          <option value="condition">Condition</option>
          <option value="notification">Notification</option>
        </select>
        <Button onClick={handleExport}>Export</Button>
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Button onClick={() => fileInputRef.current.click()}>Import</Button>
        <Button onClick={undo}>Undo</Button>
        <Button onClick={redo}>Redo</Button>
        <Button onClick={reset}>Reset</Button>
      </Toolbar>
      <section
        ref={reactFlowWrapper}
        style={{ width: '100%', height: '100%' }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        aria-label="Workflow Canvas"
      >
        <WorkflowTitle />
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
      </section>
    </React.Fragment>
  )
}
