import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react'
import { useNodesState, useEdgesState, addEdge } from 'reactflow'
import sampleData from '../data/sampleData.json'
import { version } from '../../package.json'

const FlowContext = createContext(null)

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(sampleData.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(sampleData.edges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [history, setHistory] = useState([])
  const [future, setFuture] = useState([])
  const [editNode, setEditNode] = useState(null)
  const [nodeType, setNodeType] = useState('task')
  const [workflowName, setWorkflowName] = useState('Sample Workflow')

  useEffect(() => {
    const stored = localStorage.getItem(`workflow_${version}`)
    if (stored) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(stored)
      setNodes(savedNodes)
      setEdges(savedEdges)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      `workflow_${version}`,
      JSON.stringify({ nodes, edges }),
    )
  }, [nodes, edges])

  const addHistory = useCallback(() => {
    setHistory((h) => [...h, { nodes, edges }])
    setFuture([])
  }, [nodes, edges])

  const undo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setFuture((f) => [{ nodes, edges }, ...f])
      setNodes(prev.nodes)
      setEdges(prev.edges)
      setHistory((h) => h.slice(0, -1))
    }
  }

  const redo = () => {
    if (future.length > 0) {
      const next = future[0]
      setHistory((h) => [...h, { nodes, edges }])
      setNodes(next.nodes)
      setEdges(next.edges)
      setFuture((f) => f.slice(1))
    }
  }

  const onConnect = useCallback(
    (params) => {
      addHistory()
      setEdges((eds) => addEdge(params, eds))
    },
    [addHistory, setEdges],
  )

  const addNodeAtPosition = (position, type = 'task') => {
    addHistory()
    const newNode = {
      id: `${+new Date()}`,
      type,
      position,
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
    }
    setNodes((nds) => [...nds, newNode])
  }

  const onNodeClick = (_, node) => {
    setSelectedNode(node)
  }

  const deleteNodeOrEdge = (id, type) => {
    addHistory()
    if (type === 'node') setNodes((nds) => nds.filter((n) => n.id !== id))
    if (type === 'edge') setEdges((eds) => eds.filter((e) => e.id !== id))
  }

  const value = useMemo(() => {
    return {
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      onNodeClick,
      selectedNode,
      setSelectedNode,
      deleteNodeOrEdge,
      undo,
      redo,
      addNodeAtPosition,
      editNode,
      setEditNode,
      setNodes,
      setEdges,
      nodeType,
      setNodeType,
      workflowName,
      setWorkflowName,
    }
  }, [
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectedNode,
    setSelectedNode,
    deleteNodeOrEdge,
    undo,
    redo,
    editNode,
    setEditNode,
    nodeType,
  ])

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export const useFlowContext = () => {
  const context = useContext(FlowContext)
  if (!context) {
    throw new Error('useFlowContext must be used within a FlowProvider')
  }
  return context
}
