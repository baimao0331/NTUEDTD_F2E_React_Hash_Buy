import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"

import Cart from "../components/Cart"

export default function Home(){
    return (
        <>
            <Helmet>
                <title>購物車</title>
            </Helmet>
            <Header/>
            <Cart/>
            <Footer/>
        </>
      )
}