import React, { useState } from 'react';
import "./Navbar.scss"
import { Link } from 'react-router-dom';
import {BsCart2} from 'react-icons/bs'
import Cart from '../cart/Cart';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { AiOutlineLogout } from "react-icons/ai";
import {userData} from '../../Helper/Helper';



function Navbar() {
    

    const {username}=userData();
    const navigate = useNavigate();
    const [openCart,setopenCart]= useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
   

const categories= useSelector(state => state.categoryReducer.categories);
const cart= useSelector(state => state.cartReducer.cart);
let totalItem=0;
cart.forEach(item => totalItem +=item.quantity)


const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };


  return (
    <>
    <nav className='Navbar'>
        <div className="container nav-container">
        
            <div className="nav-left">
                <ul className="link-group">
                {categories?.map((category) => (
                                <li className="hover-link" key={category.id}>
                                    <Link
                                        className="link"
                                        to={`/category/${category.attributes.key}`}
                                    >
                                        {category.attributes.title}
                                    </Link>
                                </li>
                            ))}
                </ul>
            </div>
            <div className="nav-center">
            <Link to="/">
                            <h1 className="banner">Book's Haven.</h1>
                        </Link>
            </div>
            
            <div className="nav-rigth">
                
            <button  onClick={() => navigate('/login')}   className='btn-primary'>{username}</button>

               <div className="nav-cart hover-link" onClick={()=> setopenCart(!openCart)}>
                   <BsCart2  className="icon"/> 
                   {totalItem >0 &&
                   <span className='cart-count'>{totalItem}</span>
                   }
                </div>
              <i className='logout' onClick={handleLogout}><AiOutlineLogout/></i>
            </div>

            </div>
    </nav>
    {openCart &&   <Cart onClose={()=> setopenCart(false)}/>}
    </>
  )
}

export default Navbar