import { Link } from 'react-router'
import { SunMedium, Moon } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrency, updateCurrency } from "../redux/currencySlice";
import { selectLightMode, setColorMode } from '../redux/colorSlice'

export default function Navbar() {
    const dispatch = useDispatch();
    const currency = useSelector(selectCurrency);
    const lightMode = useSelector(selectLightMode);
    console.log(lightMode);

    const currencyChange = (value) => {
        dispatch(updateCurrency(value));
    };

    const toggleColor = () => {
        dispatch(setColorMode(!lightMode))
        if (lightMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <>
            <nav className=" bg-stone-300 dark:bg-stone-700 font-medium hidden sm:block text-stone-900 dark:text-stone-50">
                <div className='max-w-screen-xl mx-auto h-10 px-10 pr-9 flex justify-between'>
                    <ul className=' flex gap-8 h-full items-center '>
                        <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                            <Link to={`/`}>首頁</Link>
                        </li>
                        <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                            <Link to={`/products/category/3Dmodel`}>3D模型</Link>
                        </li>
                        <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                            <Link to={`/products/category/goods`}>周邊商品</Link>
                        </li>
                        <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                            <Link to={`/`}>購物說明</Link>
                        </li>
                    </ul>
                    <ul className="flex items-center gap-4">
                        <li className=" flex items-center">
                            <span className=" text-nowrap">使用幣值 : </span>
                            <select
                                defaultValue={currency}
                                onChange={(event) => currencyChange(event.target.value)}
                                className="select shadow-none h-8 focus:outline-none ml-1 border-0 bg-stone-300 dark:bg-stone-600 cursor-pointer">
                                <option value='TWD' className='dark:bg-stone-600'>TWD</option>
                                <option value='JPY' className='dark:bg-stone-600'>JPY</option>
                                <option value='USD' className=' dark:bg-stone-600'>USD</option>
                            </select>
                        </li>
                        <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="synthwave" defaultChecked={lightMode} onClick={toggleColor} />

                            {/* sun icon */}
                            <SunMedium size="30" className='swap-off ' />


                            {/* moon icon */}
                            <Moon size="30" className=' swap-on' />
                        </label>
                    </ul>
                </div>

            </nav>
        </>
    )
}