import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router"
import { useState } from "react";
import { registerUser } from "../api/register";
import { useNavigate, useLocation } from "react-router";


export default function Regiser() {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [successModal, setSuccessModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from || "/"; // 預設跳回首頁

    const handleRegister = async (e) => {
        e.preventDefault(); // 防止預設 form 提交造成頁面跳轉
        try {
            const user = await registerUser(email, password, displayName);
            console.log("註冊成功:", user.uid);
            setSuccessModal(true);
        } catch (err) {
            console.error("註冊失敗:", err.message);
        }
    };
    return (
        <>
            <Helmet>
                <title>註冊</title>
            </Helmet>
            <Header />
            <main>
                {successModal && (
                    <div className="fixed bg-stone-300/50 dark:bg-stone-700/50 backdrop-blur-xl inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className=" rounded-lg bg-stone-50 dark:bg-stone-600 p-6 shadow-lg w-80 text-center">
                            <h2 className="text-xl font-bold mb-2">註冊成功</h2>
                            <p className="mb-4">需要完成信箱驗證並至會員中心填寫資料才能進行購物</p>
                            <span
                                onClick={() => navigate(fromPage)}
                                className="dark:text-orange-300 text-orange-400  cursor-pointer font-bold"
                            >
                                沒問題，返回首頁
                            </span>
                        </div>
                    </div>
                )}
                <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8 bg-stone-50 dark:bg-stone-700 rounded-lg w-2/3 justify-self-center mb-10 shadow-xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                            註冊新帳號
                        </h2>
                        <hr className="w-1/4 border-orange-300 border-3 mt-4 rounded-2xl justify-self-center" />
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm/6 font-medium">
                                    暱稱
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        autoComplete="username"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-stone-300 placeholder:text-stone-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
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
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-stone-300 placeholder:text-stone-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-orange-300 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                >
                                    註冊
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-stone-600 dark:text-stone-300">
                            已經有帳號?{' '}
                            <Link to="/account/login" className="font-semibold text-orange-300 hover:text-orange-500">
                                點我去登入
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}