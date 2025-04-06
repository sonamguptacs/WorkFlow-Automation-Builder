import React from 'react'
import { actions, useTable } from 'react-table'
import styled from 'styled-components'
import { useFlowContext } from '../context/WorkFlowContext'

const TableContainer = styled.div`
  padding: 20px;
  margin: auto;
  width: 95%;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 16px;
    width: 100%;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`

export const WorkFlowTable = () => {
  const { nodes, setNodes } = useFlowContext()

  const data = React.useMemo(() => {
    return nodes.map((node) => ({
      id: node.id,
      type: node.type,
      name: node.data.label || '',
      status: node.data.status || 'Pending',
      actions: node.data.actions || 'None',
    }))
  }, [nodes])

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Type', accessor: 'type' },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row, value }) => (
          <input
            defaultValue={value}
            onBlur={(e) => {
              const updated = [...nodes]
              const index = updated.findIndex((n) => n.id === row.original.id)
              updated[index].data.label = e.target.value
              setNodes(updated)
            }}
          />
        ),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row, value }) => (
          <input
            defaultValue={value}
            onBlur={(e) => {
              const updated = [...nodes]
              const index = updated.findIndex((n) => n.id === row.original.id)
              updated[index].data.status = e.target.value
              setNodes(updated)
            }}
          />
        ),
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row, value }) => (
          <input
            defaultValue={value}
            onBlur={(e) => {
              const updated = [...nodes]
              const index = updated.findIndex((n) => n.id === row.original.id)
              updated[index].data.actions = e.target.value
              setNodes(updated)
            }}
          />
        ),
      },
    ],
    [nodes, setNodes],
  )

  const tableInstance = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <TableContainer>
      <h2>Workflow Summary</h2>
      <table {...getTableProps()} border="1" cellPadding="8" cellSpacing="0">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableContainer>
  )
}
