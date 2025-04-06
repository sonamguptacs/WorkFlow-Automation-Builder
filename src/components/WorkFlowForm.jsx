import { SidePanel, FormWrapper, CloseButton } from './styledComponents'
import { useFlowContext } from '../context/WorkFlowContext'
import { useForm } from 'react-hook-form'
import { getFormFields } from './utils'

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
        {getFormFields(editNode.type).map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              {...register(field.name, { required: field.required || false })}
              defaultValue={editNode.data[field.name]}
              type={field.type}
            />
            {errors[field.name] && <span>This field is required</span>}
          </div>
        ))}
        <button type="submit">Save</button>
      </FormWrapper>
    </SidePanel>
  )
}
