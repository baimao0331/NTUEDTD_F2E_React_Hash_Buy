import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router'
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import HambergerMenu from './HambergerMenu';
import Navbar from './Navbar';
import SearchModal from './SearchModal';

export default function Header() {
    const cartItemNum = (useSelector(selectCartItems)).length;
    return (
        <>
            <header className=' header bg-orange-300 '>
                <div className=' relative max-w-screen-xl mx-auto h-15 flex items-center justify-between px-10'>
                    <HambergerMenu className=''/>
                    {/* LOGO */}
                    <Link to={`/`} className=" md:absolute h-full items-center ml-20 md:ml-0">
                        <p className=' text-3xl font-extrabold text-orange-900 mt-3'>Hash·Buy</p>
                    </Link>
                    <div className="flex h-full items-center ">
                        <SearchModal/>
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