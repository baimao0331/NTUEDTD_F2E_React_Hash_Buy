import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router"
import { useState } from "react";
import { loginUser } from "../api/login";


export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(email, password);
            console.log("登入成功", user);
            // ✅ 你可以加導頁：navigate("/account/dashboard")，或顯示歡迎畫面
        } catch (err) {
            console.error("登入失敗", err.message);
            // ✅ 建議顯示錯誤訊息給使用者
        }
    };

    return (
        <>
            <Helmet>
                <title>登入</title>
            </Helmet>
            <Header />
            <main>
                <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8 bg-stone-50 dark:bg-stone-700 rounded-lg w-2/3 justify-self-center mb-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                            登入帳號
                        </h2>
                        <hr className="w-1/4 border-orange-300 border-3 mt-4 rounded-2xl justify-self-center" />
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium">
                                    電子信箱
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-stone-300 placeholder:text-stone-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium">
                                        密碼
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-stone-300 placeholder:text-stone-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                                    />
                                </div>
                                <div className="text-sm mt-4">
                                    <a href="#" className="font-semibold text-orange-300 hover:text-orange-500">
                                        忘記密碼?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-orange-300 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                >
                                    登入
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-stone-600 dark:text-stone-300">
                            還沒有帳號?{' '}
                            <Link to="/account/register" className="font-semibold text-orange-300 hover:text-orange-500">
                                點我去註冊
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}