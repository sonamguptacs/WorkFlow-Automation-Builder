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
