import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../api/index";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router";

export default function ResetPassword() {
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("重設密碼連結已發送到你的信箱！");
        } catch (err) {
            setError("發送失敗，請確認信箱是否正確");
        }
    };

    return (
        <>
            <Helmet>
                <title>重設密碼</title>
            </Helmet>
            <Header />
            <div className="max-w-screen-xl mx-auto bg-white dark:bg-stone-700 rounded-xl shadow w-8/10 px-6 md:pb-20 lg:w-2/3 py-8 lg:px-24 ">
                <div className=" lg:w-1/2 mx-auto">
                    <h3 className=' my-5 items-center gap-2 text-xl text-orange-900 dark:text-orange-300 font-bold text-center w-full'>
                        重設密碼
                    </h3>
                    <hr className="w-1/4 border-orange-300 border-3 mt-4 rounded-2xl justify-self-center mb-4" />
                    {message && <div className=" bg-success h-16 rounded-xl flex items-center my-8 shadow-success/30 shadow-2xl"><p className=" w-full text-center text-stone-700 font-bold">{message}</p></div>}
                    {error && <div className=" bg-error h-16 rounded-xl flex items-center my-8 shadow-error/30 shadow-2xl"><p className=" w-full text-center text-stone-700 font-bold">{error}</p></div>}
                    <p className=" text-center">請輸入註冊時使用的電子信箱，我們會將重設密碼的指示送至您的信箱。</p>

                    <form onSubmit={handleReset} className="space-y-4 mt-8">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@hashbuy.com"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-stone-300 placeholder:text-stone-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                            required
                        />
                        <button type="submit" className="btn w-full">
                            發送重設信件
                        </button>
                        <Link to='/account/login'> <p className=" w-full text-center cursor-pointer hover:text-orange-300 duration-75">回到登入</p> </Link>

                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
