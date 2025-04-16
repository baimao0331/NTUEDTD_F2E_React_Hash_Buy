import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Product from './pages/Product';
import Category from './pages/Category';
import store from './redux/store';
import Checkout from './pages/Checkout';

function App() {

  return (
    <>
      <Provider store={store}>
        <HelmetProvider context={{}}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shoppingcart' element={<ShoppingCart />} />
              <Route path='/checkout' element={<Checkout />}/>
              <Route path='/products'>
                <Route path="category/:categoryName" element={<Category />} />
                <Route path="id/:id" element={<Product />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>

    </>
  )
}

export default App
