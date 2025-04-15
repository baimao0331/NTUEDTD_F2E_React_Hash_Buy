import { Link } from 'react-router'
import { SunMedium, Moon } from 'lucide-react';

export default function Navbar() {

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; //黑暗模式偵測

    return (
        <>
            <nav className=" bg-stone-300 font-medium hidden sm:block">
                <div className='max-w-screen-xl mx-auto h-10 px-10 pr-9 flex justify-between'>
                    <ul className=' flex gap-8 h-full items-center'>
                        <li className='hover:text-stone-600 '>
                            <Link to={`/`}>首頁</Link>
                        </li>
                        <li className='hover:text-stone-600 '>
                            <Link to={`/products/category/3Dmodel`}>3D模型</Link>
                        </li>
                        <li className='hover:text-stone-600 '>
                            <Link to={`/products/category/goods`}>周邊商品</Link>
                        </li>
                        <li className='hover:text-stone-600 '>
                            <Link to={`/`}>購物說明</Link>
                        </li>
                    </ul>
                    <ul className="flex items-center gap-4">
                        <li className=" flex items-center">
                            <span className=" text-nowrap">使用幣值 : </span>
                            <select defaultValue="TWD" className="select select-ghost h-8 focus:outline-none ml-1">
                                <option>TWD</option>
                                <option>JPY</option>
                                <option>USD</option>
                            </select>
                        </li>
                        <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="synthwave" defaultChecked={isDarkMode} />

                            {/* sun icon */}
                            <SunMedium size="30" className='swap-off '/>


                            {/* moon icon */}
                            <Moon size="30" className=' swap-on'/>
                        </label>
                    </ul>
                </div>

            </nav>
        </>
    )
}