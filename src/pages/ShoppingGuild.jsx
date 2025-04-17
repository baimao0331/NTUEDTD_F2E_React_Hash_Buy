import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"

import Guide from "../components/Guide"

export default function Home(){
    return (
        <>
            <Helmet>
                <title>購物須知</title>
            </Helmet>
            <Header/>
            <Guide/>
            <Footer/>
        </>
      )
}