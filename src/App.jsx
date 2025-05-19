import { BrowserRouter, Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/authSlice";
import './api/index';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Product from './pages/Product';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import Results from './pages/Results';
import ShoppingGuide from './pages/ShoppingGuild';
import Login from './pages/Login';
import Regiser from './pages/Register';
import Setting from './pages/setting';

const auth = getAuth();


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <HelmetProvider context={{}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shoppingcart' element={<ShoppingCart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/results/:keyword' element={<Results />} />
            <Route path='/guide' element={<ShoppingGuide />} />
            <Route path='/products'>
              <Route path="category/:categoryName" element={<Category />} />
              <Route path="id/:id" element={<Product />} />
            </Route>
            <Route path='/account'>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Regiser />} />
              <Route path='setting'  element={ <Setting/> }/>
              <Route path='liked'  element={ <></> }/>
              <Route path='order'  element={ <></> }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default App
