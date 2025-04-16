import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"

import CheckoutContent from "../components/CheckoutContent"

export default function Home() {
    return (
        <>
            <Helmet>
                <title>結帳</title>
            </Helmet>
            <Header></Header>
            <CheckoutContent />
            <Footer></Footer>
        </>
    )
}