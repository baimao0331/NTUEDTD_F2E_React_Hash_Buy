import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <>
            <Helmet>
                <title>分類</title>
            </Helmet>
            <Header></Header>
            <p>Hello sekai</p>
            <Footer></Footer>
        </>
    )
}