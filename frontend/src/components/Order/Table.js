import React, { useState } from 'react'
import {useReactTable , getCoreRowModel , flexRender,getSortedRowModel} from "@tanstack/react-table"
import { Link } from 'react-router-dom';
import {BiLinkExternal} from 'react-icons/bi'

const Table = ({data}) => {
    const columns = [{
        header:"Order Id",
        accessorKey:'id'
      },
      {
        header:'Price',
        accessorKey:"price"
      },
      {
        header:'Dated',
        accessorKey:"date",
      },
      {
        header:"ItemQty",
        accessorKey:"itemQty"
      },
      {
        header:'Status',
        accessorKey:"status",
        cell: ({ row }) => (
            <span className={row.original.status === 'Processing' ? 'redColor' : 'greenColor'}>
              {row.original.status}
            </span>
          )
      },
      {
        header:"Link",
        accessorKey:"link",
        cell: ({ row }) => (
            <Link to={`/order/${row.original.id}`}><BiLinkExternal/></Link>
          )
      }
    ]

    const [sorted,setSorted] = useState([])

const table = useReactTable({data , columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
          sorting: sorted,
        },
        onSortingChange: setSorted
})
  return (
    <div className='table'>
    <h1>Your Orders</h1>
    <table >
    <thead>
        {table.getHeaderGroups().map(headerGroup=>(
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header=>(
                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {
                        { asc: '🔼', desc: '🔽' }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </th>
                ))}
            </tr>
        ))}
    </thead>
<tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
</table></div>
    
  )
}

export default Table
