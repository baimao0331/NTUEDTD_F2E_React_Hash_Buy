import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"

import HomeContent from "../components/HomeContent"

export default function Home(){
    return (
        <>
            <Helmet>
                <title>首頁</title>
            </Helmet>
            <Header/>
            <HomeContent/>
            <Footer/>
        </>
      )
}