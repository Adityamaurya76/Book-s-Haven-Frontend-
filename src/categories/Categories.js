import React, { useEffect, useState } from 'react';
import Product from '../../src/components/product/Product'
import './Categories.scss';
import { useNavigate,useParams} from "react-router";
import { useSelector } from 'react-redux';
import { axiosClient } from '../utils/axiosClient';



function Categories() {
  const navigate=useNavigate();
  const params=useParams();
 const [categoryId,setcategoryId]=useState('');

 const categories=useSelector((state)=> state.categoryReducer.categories);
 const [products, setProducts]=useState([]);

 const sortOptions = [
  {
      value: "Price - Low To High",
      sort: "price",
  },
  {
      value: "Newest First",
      sort: "createdAt",
  },
];

const[sortBy, setSortBy]= useState(sortOptions[0].sort)

 async function fetchdata(){
  const url= params.categoryId ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
  : `/products?populate=image&sort=${sortBy}`;
  const response=await axiosClient.get(url)
   setProducts(response.data.data);
 }

useEffect(()=>{
  setcategoryId(params.categoryId);
  fetchdata();
},[params,sortBy])

function updatecategory(e){
  navigate(`/category/${e.target.value}`);
}

function HandleSortChange(e){
 const sortKey=e.target.value;
  setSortBy(sortKey);
}
  return (
   <div className="categories">
      <div className="container">
      <div className="header">
        <div className="info">
          <h2>Explore All Print and Artwork</h2>
          <p> India's largest collection of wall posters for your
                            bedroom, living room, kids room, kitchen and posters
                            & art prints at highest quality lowest price
                            guaranteed.</p>
        </div>
        <div className="sort-by">
          <div className="sot-by-container">
           <h3 className="sort-by-text">Sort By</h3>
           <select className='select-sort-by' name="sort-by" id="sort-by" onChange={HandleSortChange}>
           {sortOptions.map((item) => (
                                    <option key={item.sort} value={item.sort}>
                                        {item.value}
                                    </option>
                                ))}
           </select>
             </div>       
           </div>
       </div>
       <div className="content">
        <div className="filter-box">
          <div className="category-filter">
            <h3>Category</h3>
            {categories?.map((item)=>(
              <div key={item.id} className="filter-radio">
                 <input name='category'
                  type="radio"
                  value={item.attributes.key}
                   id={item.id}
                   onChange={updatecategory}
                   checked={item.attributes.key===categoryId}/>
                    <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
            ))}
          
            
          </div>
        </div>
        <div className="product-box">
          {products.map(product => <Product key={product.id} product={product}/>)}
        </div>
       </div>
      </div>
   </div>
  );
}

export default Categories;