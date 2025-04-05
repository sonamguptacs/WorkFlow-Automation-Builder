import { SidePanel, FormWrapper, CloseButton } from './styledComponents'
import { useFlowContext } from '../context/WorkFlowContext'
import { useForm } from 'react-hook-form'

export const WorkFlowForm = () => {
  const { editNode, setEditNode, setNodes } = useFlowContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (formData) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === editNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                ...formData,
                label: formData.taskName, // Optional: update label
              },
            }
          : node,
      ),
    )
    setEditNode(null)
    reset()
  }

  if (!editNode) return null

  return (
    <SidePanel>
      <CloseButton onClick={() => setEditNode(null)}>&times;</CloseButton>
      <h3>Configure Task</h3>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Task Name</label>
          <input {...register('taskName', { required: true })} />
          {errors.taskName && <span>Required</span>}
        </div>
        <div>
          <label>Assignee</label>
          <input {...register('assignee', { required: true })} />
          {errors.assignee && <span>Required</span>}
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" {...register('dueDate', { required: true })} />
          {errors.dueDate && <span>Required</span>}
        </div>
        <button type="submit">Save</button>
      </FormWrapper>
    </SidePanel>
  )
}
