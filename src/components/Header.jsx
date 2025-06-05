import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router'
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import HambergerMenu from './HambergerMenu';
import Navbar from './Navbar';
import SearchModal from './SearchModal';
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";

export default function Header() {
    const [searchParams] = useSearchParams();
    const [toastMsg, setToastMsg] = useState(null);
    const [toastType, setToastType] = useState(null);
    const cartItemNum = (useSelector(selectCartItems)).length;

    useEffect(() => {
        const reason = searchParams.get("reason");
        if (!reason) return;
        switch (reason) {
            case "notLoggedIn":
                setToastMsg("請先登入後繼續操作");
                setToastType("error");
                break;
            case "notVerified":
                setToastMsg("請完成信箱驗證");
                setToastType("error");
                break;
            case "finishCheckout":
                setToastMsg("完成結帳");
                setToastType("success");
                break;
            case "loginSuccess":
                setToastMsg("成功登入");
                setToastType("success");
                break;
                break;
            case "logout":
                setToastMsg("成功登出");
                setToastType("success");
                break;
            case "addtoCart":
                setToastMsg("已加入購物車");
                setToastType("success");
                break;
            default:
                setToastMsg("發生未知狀態");
                setToastType("error");
                break;
        }

        if (reason) {
            const timer = setTimeout(() => {
                setToastMsg(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);
    return (
        <>
            <header className='  bg-orange-300 w-screen'>
                <div className=' relative  max-w-screen-xl mx-auto max-h-16 p-2 flex items-center justify-between px-5 md:px-10'>
                    <HambergerMenu className='' />
                    {/* LOGO */}
                    <Link to={`/`} className=" md:absolute h-full items-center ml-[7.5vw] md:ml-0">
                        <p className=' text-3xl font-extrabold text-orange-900 mt-3'>Hash·Buy</p>
                    </Link>
                    <div className="flex h-full items-center ">
                        <SearchModal />
                        <Link className='relative' to={`/shoppingCart`}>
                            <div className="absolute badge bg-orange-600 border-orange-300 text-stone-50 rounded-full -right-2 bottom-1/2 text-sm font-bold !p-0 !pb-0.5 aspect-square border-3">{cartItemNum}</div>
                            <ShoppingCart className=' size-[2.4vw] max-w-[40px] min-h-[30px] min-w-[30px] text-orange-900 ml-8' />
                        </Link>
                    </div>
                </div>
                <Navbar></Navbar>
            </header>
            <Toast message={toastMsg} type={toastType} />
        </>
    )
}