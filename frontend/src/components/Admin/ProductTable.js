import React, { useState } from 'react'
import {useReactTable , getCoreRowModel , flexRender,getSortedRowModel} from "@tanstack/react-table"
import { Link } from 'react-router-dom';
import {BiEditAlt,} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../actions/productActions';
import { ToastContainer, toast } from 'react-toastify';

const Table = ({data}) => {
  const dispatch = useDispatch();
  const deleteProductHandler =(id)=>{
    toast.warning("Deleting Product", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    dispatch(deleteProduct(id));
  }
    const columns = [{
        header:"Product Id",
        accessorKey:'id',
        cell:({row})=>(
            <Link to={`/product/${row.original.id}`}><p>{row.original.id}</p></Link>
        )
      },
      {
        header:'Name',
        accessorKey:"name"
      },
      {
        header:'Price',
        accessorKey:"price",
      },
      {
        header:"Stock",
        accessorKey:"stock",
        cell: ({ row }) => (
            <span className={row.original.stock === 0 ? 'redColor' : 'greenColor'}>
              {row.original.stock}
            </span>
          )
      },
      {
        header:"Action",
        accessorKey:"link",
        cell: ({ row }) => (
            <div className='productActions'> <Link to={`/admin/product/${row.original.id}`}><BiEditAlt/></Link>
            <Link onClick={()=>deleteProductHandler(row.original.id)}><MdDelete/></Link></div>
            
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
