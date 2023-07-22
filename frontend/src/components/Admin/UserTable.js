import React, { useState } from 'react'
import {useReactTable , getCoreRowModel , flexRender,getSortedRowModel} from "@tanstack/react-table"
import { Link } from 'react-router-dom';
import {BiEditAlt,} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { deleteUser } from '../../actions/userAction';

const Table = ({data}) => {
  const dispatch = useDispatch();
  const deleteUserHandler =(id)=>{
    toast.warning("Deleting User", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    dispatch(deleteUser(id));
  }
    const columns = [{
        header:"User Id",
        accessorKey:'id',
      },
      {
        header:'Name',
        accessorKey:"name"
      },
      {
        header:'Email',
        accessorKey:"email"
      },
      {
        header:"Role",
        accessorKey:"role",
        cell: ({ row }) => (
            <span className={row.original.role === 'user' ? 'redColor' : 'greenColor'}>
              {row.original.role}
            </span>
          )
      },
      {
        header:"Action",
        accessorKey:"link",
        cell: ({ row }) => (
            <div className='productActions'> <Link to={`/admin/user/${row.original.id}`}><BiEditAlt/></Link>
            <Link onClick={()=>deleteUserHandler(row.original.id)}><MdDelete/></Link></div>
            
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
</table>
<ToastContainer/></div>
    
  )
}

export default Table
