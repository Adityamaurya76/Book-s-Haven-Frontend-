import React, { useEffect, useState } from 'react'
import "./ProductDetails.scss";
import dummyImg from "../../assets/naruto.jpeg";
import { useParams } from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';

function ProductDetail() {

  const params= useParams();
  const [product ,setproducts] =useState(null);
  const dispatch= useDispatch();
  const productKey=params.productId;

  const cart= useSelector(state => state.cartReducer.cart);
  const quantity = cart.find(item => item.key === params.productId)?.quantity || 0;


   async function fetchdata(){
    const productResponse =await axiosClient.get(`/products?filters[key][$eq]=${params.productId}&populate=*`);
    console.log('product', productResponse);
    if(productResponse.data.data.length>0){
      setproducts(productResponse.data.data[0])
    }
    
   }
  useEffect(() =>{
    setproducts(null);
   fetchdata();
  },[params])

  if(!product){
    return <Loader />
  }

  return (
    <div className='ProductDetail'>
      <div className="container">
        <div className="product-layout">
          <div className="product-img" center>
           
            <img src={product?.attributes.image.data.attributes.url} alt="Product image" />
            
          </div>
          <div className="product-info">
               <h1 className="heading">
                {product?.attributes.title}
                </h1>   
                <h3 className='price'> ₹ {product?.attributes.price}</h3>
                <p className="describeption">
                 {product?.attributes.desc}
                </p>
                <div className="cart-option">
                  <div className="quantity-selecter">
                      <span className='btn' onClick={()=> dispatch(removeFromCart(product))}>-</span>
                      <span className='quantity'>{quantity}</span>
                      <span className='btn' onClick={()=> dispatch(addToCart(product))}>+</span>
                    </div> 
                    <button className="btn-primary  add-to-cart" onClick={()=> dispatch(addToCart(product))}>
                      Add to Cart
                    </button>
                </div>
                <div className="return-policy">
                <ul>
                                <li>
                                    This product is made to order and is
                                    typically printed in 3-6 working days. Your
                                    entire order will ship out together.
                                </li>
                                <li>
                                    Since this product is printed on demand
                                    especially for you, it is not eligible for
                                    cancellations and returns. Read our Return
                                    Policy.
                                </li>
                            </ul>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail