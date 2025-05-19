import DarkModeBtn from './DarkModeBtn';
import CurrencySelect from './CurrencySelect';
import HoverUnderLine from '../motion/HoverUnderLine'
import { getCurrentUser } from "../api/authStatus";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/authSlice";
import { getAuth, signOut } from "firebase/auth";
import { app } from '../api/index'

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
            <nav className=" bg-stone-200 dark:bg-stone-700 font-medium hidden sm:block text-stone-900 dark:text-stone-50">
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
                        <DarkModeBtn />
                        <span className=' select-none'>|</span>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <HoverUnderLine to={`/account/setting`}>會員中心</HoverUnderLine>
                                <span className=' select-none'>|</span>
                                <HoverUnderLine to={`#`}>
                                    <span onClick={handleLogout}>登出</span>
                                </HoverUnderLine>
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