export const getNodeIcon = (label) => {
  switch (label) {
    case 'task':
      return '📋'
    case 'condition':
      return '❓'
    case 'notification':
      return '🔔'
    default:
      return null
  }
}

export const getFormFields = (label) => {
  switch (label) {
    case 'task':
      return [
        { name: 'label', label: 'Type', type: 'text', required: true },
        { name: 'name', label: 'Task Name', type: 'text', required: true },
        { name: 'assignee', label: 'Assignee', type: 'text', required: true },
        { name: 'dueDate', label: 'Due Date', type: 'date' },
        { name: 'priority', label: 'Priority', type: 'text' },
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'description', label: 'Task Description', type: 'text' },
      ]
    case 'condition':
      return [
        { name: 'label', label: 'Type', type: 'text', required: true },
        { name: 'condition', label: 'Condition', type: 'text', required: true },
        { name: 'true', label: 'Yes Action', type: 'text' },
        { name: 'false', label: 'No Action', type: 'text' },
      ]
    case 'notification':
      return [
        { name: 'label', label: 'Type', type: 'text', required: true },
        { name: 'recepient', label: 'To', type: 'text', required: true },
        { name: 'subject', label: 'Subject', type: 'text' },
        {
          name: 'message',
          label: 'Notification Message',
          type: 'text',
          required: true,
        },
      ]
    default:
      return [{ name: 'label', label: 'Label', type: 'text' }]
  }
}
