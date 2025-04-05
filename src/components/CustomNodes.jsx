import styled from 'styled-components'
import { Handle, Position } from 'reactflow'
import { useFlowContext } from '../context/WorkFlowContext'

const NodeContainer = styled.div`
  background: #fff;
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 10px;
  position: relative;
  min-width: 160px;
  text-align: center;
  display: flex;
`

const IconButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  color: #007bff;

  &:hover {
    color: #ff4136;
  }
`

const EditButton = styled(IconButton)`
  top: 4px;
  right: 48px;
`

const DeleteButton = styled(IconButton)`
  top: 4px;
  right: 24px;
`

const AddButton = styled(IconButton)`
  top: 4px;
  right: 0px;
  color: #28a745;

  &:hover {
    color: #155724;
  }
`

const BaseNode = ({ data, id }) => {
  const {
    setEditNode,
    setNodes,
    nodeType,
    addNodeAtPosition,
  } = useFlowContext()

  const handleEdit = () => {
    setEditNode({ id, ...data })
  }

  const handleDelete = () => {
    setNodes((prev) => prev.filter((node) => node.id !== id))
  }

  const handleAdd = () => {
    const newId = `${Date.now()}`

    setNodes((prev) => {
      const currentNode = prev.find((node) => node.id === id)
      if (!currentNode) return prev

      const siblingNodes = prev.filter(
        (node) => node.position.y === currentNode.position.y,
      )
      const maxX = siblingNodes.reduce(
        (max, node) => (node.position.x > max ? node.position.x : max),
        currentNode.position.x,
      )

      const position = {
        x: maxX + 200,
        y: currentNode.position.y,
      }

      addNodeAtPosition(position, newId, nodeType)

      const newNode = {
        id: newId,
        type: nodeType,
        position,
        data: { label: `${nodeType} node` },
      }

      return [...prev, newNode]
    })

    setEdges((prev) => [
      ...prev,
      {
        id: `e${id}-${newId}`,
        source: id,
        target: newId,
        type: 'default',
      },
    ])

    setEditNode({ id: newId, type: nodeType })
  }

  return (
    <NodeContainer>
      <EditButton onClick={handleEdit}>✏️</EditButton>
      <DeleteButton onClick={handleDelete}>🗑️</DeleteButton>
      <AddButton onClick={handleAdd}>➕</AddButton>
      <Handle type="target" position={Position.Top} />
      <div>{data.label || 'Untitled'}</div>
      <Handle type="source" position={Position.Bottom} />
    </NodeContainer>
  )
}

export const nodeTypes = {
  task: BaseNode,
  approval: BaseNode,
  delay: BaseNode,
}
