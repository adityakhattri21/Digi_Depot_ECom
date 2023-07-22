import React, { useState } from 'react'
import {useReactTable , getCoreRowModel , flexRender,getSortedRowModel} from "@tanstack/react-table"
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { deleteReview } from '../../actions/productActions';

const OrderTable = ({data,productId}) => {
    const dispatch = useDispatch();

    const deleteReviewHandler = (id)=>{
        toast.warning("Deleting Review", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        dispatch(deleteReview(productId,id));
        
    }
    const columns = [{
        header:"Review Id",
        accessorKey:'id'
      },
      {
        header:"User",
        accessorKey:"user"
      },
      {
        header:"Comment",
        accessorKey:"comment"
      },
      {
        header:"Action",
        accessorKey:"link",
        cell: ({ row }) => (
            <div className='productActions'>
            <Link onClick={()=>deleteReviewHandler(row.original.id)}><MdDelete/></Link></div>
            
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
try {
    return (
        <div className='table'>
        <h1> Reviews</h1>
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
 catch (error) {
    console.log(error)
}
 
}
export default OrderTable
