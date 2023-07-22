import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getAdminProducts } from '../../actions/productActions';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { adminAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';

const Dashboard = () => {

  const dispatch = useDispatch();

  const {products,error,loading} = useSelector(state=>state.products);
  const {orders} = useSelector(state=>state.allOrders);
  const {users} = useSelector(state=>state.allUsers);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,ArcElement
  );

  let outOfStock=0;

  let totalAmount = 0;

  orders && orders.forEach(order=>{
    totalAmount+=order.totalPrice;
  })

  products.forEach(product=>{
    if(product.stock===0)
    outOfStock++;
  })

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length-outOfStock],
      },
    ],
  };



  

  useEffect(()=>{
    if(error){
      dispatch(clearErrors());
      return  toast.error(error, {
        position: "bottom-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      
    }
    dispatch(getAdminProducts());
    dispatch(adminAllOrders());
    dispatch(getAllUsers());
  },[dispatch, error])

  return (
    <>
    <MetaData title={`DashBoard`}/>
      {loading? <Loader/> : <>
      <div className='dashboard'>
      <Sidebar/>
      <div className='dashboardContainer'>
        <h1>Admin Dashboard</h1>

        <div className='dashboardSummary'>
        <div>
          <p>
            Total Amount : <br/>{`₹ ${Math.floor(totalAmount)}`}
          </p>
        </div>
        </div>

      <div className='dashboardSummary2'>
      <Link to={"/admin/products"}>
        <p>Products</p>
        <p>{products && products.length}</p>
      </Link>

      <Link to={"/admin/orders"}>
        <p>Orders</p>
        <p>{orders && orders.length}</p>
      </Link>

      <Link to={"/admin/users"}>
        <p>Users</p>
        <p>{users && users.length}</p>
      </Link>
      </div>

      <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
      </>}
    </>
  )
}

export default Dashboard
