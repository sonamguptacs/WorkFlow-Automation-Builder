import { useState, useRef, useCallback } from 'react'
import { useFlowContext } from '../../context/WorkFlowContext'

export const useCanvasHooks = () => {
  const { nodes, nodeType, setNodeType, setNodes, setEdges } = useFlowContext()

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
    const isNodeTarget = event.target?.closest('.react-flow__node')
    if (isNodeTarget) return
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

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type) return
      console.log({ type })
      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      })

      const newNode = {
        id: `${+new Date()}`,
        type,
        position,
        data: { label: type || 'Node' },
      }
      console.log({ newNode })
      setNodes((nds) => [...nds, newNode])
    },
    [reactFlowInstance],
  )

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  return {
    handleAdd,
    reset,
    onConnectStart,
    onConnectEnd,
    onDrop,
    onDragOver,
    setReactFlowInstance,
    reactFlowWrapper,
  }
}
