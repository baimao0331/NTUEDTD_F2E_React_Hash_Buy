import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"

import Settings from "../components/Settings"

export default function Home() {
    return (
        <>
            <Helmet>
                <title>結帳</title>
            </Helmet>
            <Header></Header>
            <Settings />
            <Footer></Footer>
        </>
    )
}