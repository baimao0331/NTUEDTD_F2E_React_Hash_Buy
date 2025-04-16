import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router'
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';

import Navbar from './Navbar';

export default function Header() {
    const cartItemNum = (useSelector(selectCartItems)).length;
    return (
        <>
            <header className=' header bg-orange-300 '>
                <div className='max-w-screen-xl mx-auto h-15 flex items-center justify-between px-10'>
                    <Menu size='40' className=' md:hidden'/>
                    {/* LOGO */}
                    <Link to={`/`} className=" h-full items-center ml-20 md:ml-0">
                        <p className=' text-3xl font-extrabold text-orange-900 mt-3'>Hash·Buy</p>
                    </Link>
                    <div className="flex h-full items-center ">
                        <label className="input bg-stone-50 hidden md:flex">
                            <input type="search" required placeholder="輸入關鍵字" className=' text-stone-900 font-bold' />
                        </label>
                        <Search size='40' className=' text-orange-900 ml-4' />
                        <Link className='relative' to={`/shoppingCart`}>
                            <div className="absolute badge bg-orange-600 border-orange-300 text-stone-50 rounded-full left-14 text-sm font-bold !p-0 !pb-0.5 aspect-square border-3">{cartItemNum}</div>
                            <ShoppingCart size='40' className=' text-orange-900 ml-8' />
                        </Link>

                    </div>
                </div>
                <Navbar></Navbar>
            </header>

        </>
    )
}