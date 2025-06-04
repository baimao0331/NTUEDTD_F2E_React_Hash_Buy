import DarkModeBtn from './DarkModeBtn';
import CurrencySelect from './CurrencySelect';
import HoverUnderLine from '../motion/HoverUnderLine'
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/authSlice";
import { getAuth, signOut } from "firebase/auth";
import { app } from '../api/index'
import { Link } from 'react-router';
import { Settings, ShoppingBag, LogOut, User } from 'lucide-react'

export default function Navbar() {
    const user = useSelector((state) => state.auth.user);
    const auth = getAuth(app);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(clearUser());
    };


    return (
        <>
            <nav className=" bg-stone-200 dark:bg-stone-700 font-medium hidden sm:block text-stone-900 dark:text-stone-50 !overflow-visible">
                <div className='max-w-screen-xl mx-auto h-10 px-10 pr-9 flex justify-between'>
                    <ul className=' flex gap-8 h-full items-center justify-start'>
                        <li className=' '>
                            <HoverUnderLine to={`/`}>首頁</HoverUnderLine>
                        </li>
                        <li className=' '>
                            <HoverUnderLine to={`/products/category/3D模型`}>3D模型</HoverUnderLine>
                        </li>
                        <li className=' '>
                            <HoverUnderLine to={`/products/category/周邊商品`}>周邊商品</HoverUnderLine>
                        </li>
                        <li className=' '>
                            <HoverUnderLine to={`/guide`}>購物須知</HoverUnderLine>
                        </li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <CurrencySelect />
                        <span className=' select-none'>|</span>
                        <DarkModeBtn />
                        <span className=' select-none'>|</span>
                        {user ? (
                            <div className="flex items-center gap-4 h-full group hover:bg-stone-300 dark:hover:bg-stone-600 px-2 rounded-lg ">
                                <div className="relative">
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <User/>
                                        <p>帳號</p>
                                    </div>
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-stone-200 dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-xl shadow-2xl z-[999] 
                                        opacity-0 group-hover:opacity-100 
                                        pointer-events-none group-hover:pointer-events-auto 
                                        transition-all duration-200">
                                        <ul className="py-2 px-2">
                                            <li>
                                                <Link to="/account/setting" className="flex items-center px-4 py-2 hover:bg-stone-300 dark:hover:bg-stone-600">
                                                    <Settings className="w-4 h-4 mr-2" />
                                                    個人設定
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/account/order" className="flex items-center px-4 py-2 hover:bg-stone-300 dark:hover:bg-stone-600">
                                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                                    訂單紀錄
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2 hover:bg-stone-300 dark:hover:bg-stone-600 text-left"
                                                >
                                                    <LogOut className="w-4 h-4 mr-2" />
                                                    登出
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <HoverUnderLine to={`/account/register`}>註冊</HoverUnderLine>
                                <span className=' select-none'>|</span>
                                <HoverUnderLine to={`/account/login`}>登入</HoverUnderLine>
                            </div>
                        )}
                    </div>
                </div>

            </nav>
        </>
    )
}