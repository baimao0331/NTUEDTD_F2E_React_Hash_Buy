import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"

import SearchResult from "../components/SearchResult"

export default function Home(){
    return (
        <>
            <Helmet>
                <title>搜尋</title>
            </Helmet>
            <Header/>
            <SearchResult/>
            <Footer/>
        </>
      )
}