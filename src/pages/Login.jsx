import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router"
import { loginUser } from "../api/login";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useEffect, useState } from "react";

export default function Home() {
    const [email, setEmail] = useState("");
    const [verifyModal, setVerifyModal] = useState(false);
    const [password, setPassword] = useState("");
    const [errCode, setErrCode] = useState(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from || "/"; // 預設跳回首頁

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(email, password);
            await user.reload(); // 確保 emailVerified 最新

            if (!user.emailVerified) {
                // 尚未驗證 ➜ 顯示 Modal，3 秒後回原頁（不加參數、不顯示 toast）
                setVerifyModal(true);
                setTimeout(() => {
                    navigate(fromPage);
                }, 3000);
                return;
            }

            //已驗證 ➜ 設定 Redux 狀態並直接導向，附加 reason 參數
            dispatch(setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified,
            }));

            // 導向並加參數
            const url = new URL(fromPage, window.location.origin);
            url.searchParams.set("reason", "loginSuccess");
            navigate(url.pathname + url.search);

        } catch (err) {
            console.error("登入失敗", err.message);
            switch (err.message) {
                case "Firebase: Error (auth/invalid-credential).":
                    setErrCode("信箱或密碼錯誤");
                    break;
                default:
                    setErrCode("登入失敗，請稍後再試");
                    break;
            }
        }
    };


    return (
        <>
            <Helmet>
                <title>登入</title>
            </Helmet>
            <Header />
            <main>
                {verifyModal && (
                    <div className="fixed bg-stone-300/50 dark:bg-stone-700/50 backdrop-blur-xl inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className=" rounded-lg bg-stone-50 dark:bg-stone-600 p-6 shadow-lg w-80 text-center">
                            <h2 className="text-xl font-bold mb-2">登入成功</h2>
                            <p className="mb-4">你尚未驗證信箱，請前往設定頁面進行</p>
                            <span
                                onClick={() => navigate(fromPage)}
                                className="dark:text-orange-300 text-orange-400  cursor-pointer font-bold"
                            >
                                立即返回
                            </span>
                        </div>
                    </div>
                )}
                <div className="flex min-h-full max-w-screen-xl flex-1 flex-col px-6 py-12 lg:px-8 bg-stone-50 dark:bg-stone-700 rounded-lg w-8/10 lg:w-2/3 justify-self-center mb-10 shadow-xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                            登入帳號
                        </h2>
                        <hr className="w-1/4 border-orange-300 border-3 mt-4 rounded-2xl justify-self-center" />
                    </div>
                    {errCode && (
                        <div className="bg-error mt-4 h-12 w-1/2 flex items-center justify-center mx-auto rounded-lg">
                            <p className=" inline-block text-stone-50 font-bold">{errCode}</p>
                        </div>
                    )}
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
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
                                    <Link to="/account/reset" className="font-semibold text-orange-300 hover:text-orange-500">
                                        忘記密碼?
                                    </Link>
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