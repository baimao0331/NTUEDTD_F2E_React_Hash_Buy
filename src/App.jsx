import { BrowserRouter, Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/authSlice";
import UserGate from './components/UserGate'
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
import Orders from './pages/Orders';
import ResetPassword from './pages/ResetPassword';

const auth = getAuth();


function App() {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <HelmetProvider context={{}}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shoppingcart' element={<ShoppingCart />} />
              <Route path='/checkout' element={<UserGate><Checkout /></UserGate>} />
              <Route path='/results/:keyword' element={<Results />} />
              <Route path='/guide' element={<ShoppingGuide />} />
              <Route path='/products'>
                <Route path="category/:categoryName" element={<Category />} />
                <Route path="id/:id" element={<Product />} />
              </Route>
              <Route path='/account'>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Regiser />} />
                  <Route path='setting' element={<UserGate><Setting /></UserGate>} />
                  <Route path='liked' element={<></>} />
                  <Route path='order' element={<UserGate><Orders /></UserGate>} />
                  <Route path='reset' element={<ResetPassword />}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
