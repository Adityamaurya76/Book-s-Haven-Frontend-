import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';

import ProductDetail from './pages/productDetails/ProductDetail';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Categories from './categories/Categories';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './redux/categorySlice';
import Payments from './components/payments/Payments';
import Login  from './pages/login/Login';
import Signup from './pages/singup/Signup';
import Contact from './components/Contact/Contact';
 

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/category/:categoryId?' element={<Categories />} />
          <Route path='/products/:productId' element={<ProductDetail />} />
          <Route path='/payments/:status' element={<Payments />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
