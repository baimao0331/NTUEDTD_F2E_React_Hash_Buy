import { Link } from 'react-router'
import DarkModeBtn from './DarkModeBtn';
import CurrencySelect from './CurrencySelect';

export default function Navbar() {

    return (
        <>
            <nav className=" bg-stone-300 dark:bg-stone-700 font-medium hidden sm:block text-stone-900 dark:text-stone-50">
                <div className='max-w-screen-xl mx-auto h-10 px-10 pr-9 flex justify-between'>
                    <ul className=' flex gap-8 h-full items-center justify-start'>
                        <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                            <Link to={`/`}>首頁</Link>
                        </li>
                        <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                            <Link to={`/products/category/3D模型`}>3D模型</Link>
                        </li>
                        <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                            <Link to={`/products/category/周邊商品`}>周邊商品</Link>
                        </li>
                        <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                            <Link to={`/`}>購物說明</Link>
                        </li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <CurrencySelect/>
                        <DarkModeBtn/>
                    </div>
                </div>

            </nav>
        </>
    )
}