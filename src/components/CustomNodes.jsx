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
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    min-width: 100px;
    padding: 4px;
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    gap: 0px;
  }
`

const Text = styled.div`
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 40%;
  white-space: nowrap;
  abbr {
    text-decoration: none;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
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

  @media (max-width: 480px) {
    padding: 2px;
    font-size: 10px;
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
    setEdges,
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
      <Text>{<abbr title={data.label}>{data.label}</abbr> || 'Untitled'}</Text>
      <IconContainer>
        <EditButton onClick={handleEdit}>✏️</EditButton>
        <DeleteButton onClick={handleDelete}>🗑️</DeleteButton>
        <AddButton onClick={handleAdd}>➕</AddButton>
      </IconContainer>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </NodeContainer>
  )
}

export const nodeTypes = {
  task: BaseNode,
  condition: BaseNode,
  notification: BaseNode,
}
