import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import { Button } from '@chakra-ui/react'
import {CgNametag} from 'react-icons/cg';
import {GiPriceTag} from 'react-icons/gi';
import {MdDescription,MdCategory,MdShoppingCart} from 'react-icons/md';
import './CreateProduct.css';
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const EditProduct = () => {
    const dispatch = useDispatch();
    const {id} =useParams();
    const {loading,isUpdated,error:updateError} = useSelector(state=>state.updatedProduct);
    const {error,product} = useSelector(state=>state.productDetails);
    const navigate = useNavigate();
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  
    const categories = [
      "Laptop",
      "Footwear",
      "Bottoms",
      "Tops",
      "Attire",
      "Camera",
      "SmartPhones",
    ];
  
    const updateProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
  
      setImages([]);
      setImagesPreview([]);
      setOldImages([]);
  
      files.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };
  
        reader.readAsDataURL(file);
      });
    };
  
    const updateProductSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("stock", stock);
  
      images.forEach((image) => {
        myForm.append("images", image);
      });
      toast.info("Updating Product", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      dispatch(updateProduct(id,myForm))
    };
  
    useEffect(()=>{
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
          } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
          }
      if(error){
        dispatch(clearErrors());
        toast.error(error, {
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

      if(updateError){
        dispatch(clearErrors());
        toast.error(updateError, {
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
  
      if(isUpdated === true){
        dispatch({type:UPDATE_PRODUCT_RESET})
        toast.success("Product Updated", {
          position: "bottom-center",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        navigate("/admin/dashboard");
      }
    },[dispatch, error, id, isUpdated, navigate, product, updateError])
  
    return (
      <div className='dashboard'>
      <MetaData title={'Create Product'}/>
        <Sidebar/>
        <div className='createProductDiv'>
       
        <form  onSubmit={updateProductSubmitHandler}  encType="multipart/form-data"
        >
         <h1>Edit Product</h1>
          <div className='createFormDiv'>
          <CgNametag/>
              <input
                  type='text'
                  placeholder='Product Name'
                  required
                  value={name}
                  onChange={e=>setName(e.target.value)}
              />
          </div>
  
          <div className='createFormDiv'>
          <GiPriceTag/>
              <input
                  type='number'
                  placeholder='Price'
                  required
                  value={price}
                  onChange={e=>setPrice(e.target.value)}
              />
          </div>
          <div className='createFormDiv'>
          <MdDescription/>
              <textarea
                  placeholder='Product Description'
                  rows={1}
                  cols={30}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
              />
          </div>
  
          <div className='createFormDiv'>
          <MdCategory/>
              <select
              value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value={''}>Categories</option>
                  {categories.map(category=>(
                      <option key={category} value={category}>{category}</option>
                  ))}
              </select>
          </div>
  
          <div className='createFormDiv'>
          <MdShoppingCart/>
              <input
                  type='number'
                  placeholder='Stocks'
                  required
                  value={stock}
                  onChange={e=>setStock(e.target.value)}
              />
          </div>
  
          <div id='createProductFormFile'>
          <input
              type='file'
              name='avatar'
              accept={'image/*'}
              multiple
              onChange={updateProductImagesChange}
          />
          </div>

         { oldImages.length!==0 && <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>}
  
         {imagesPreview.length!==0 && <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>}
          
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Update
              </Button>
         </form>
        </div>
        <ToastContainer/>
      </div>
    )
}

export default EditProduct
