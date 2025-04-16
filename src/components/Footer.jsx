import { Link } from 'react-router'
import DarkModeBtn from './DarkModeBtn';
import CurrencySelect from './CurrencySelect';

export default function Footer() {


    return (
        <>
            <footer className=" bg-stone-600 text-stone-100 w-full px-10 py-8">
                <div className=" max-w-screen-xl mx-auto ">
                    <div className=" grid grid-cols-2 md:grid-cols-5 gap-4">
                        <ul className=" order-1 flex flex-col gap-1">
                            <p className=" font-bold text-base">網站導覽</p>
                            <li>首頁</li>
                            <li>搜尋</li>
                            <li>3D模型</li>
                            <li>周邊商品</li>
                        </ul>
                        <ul className=" order-3 md:order-2 flex flex-col gap-1">
                            <p className=" font-bold text-base">網站設定</p>
                            <li className=' flex'><p className='mr-4'>切換顯示 :</p><DarkModeBtn/></li>
                            <li className=" flex items-center">
                            <CurrencySelect/>
                            </li>
                        </ul>
                        <ul className=" order-4 md:order-3 flex flex-col gap-1 md:col-span-2">
                            <p className=" font-bold text-base">聯絡我們</p>
                            <li>s111219028@stu.ntue.edu.tw</li>
                            <li>s111219014@stu.ntue.edu.tw</li>
                        </ul>
                        <div className=' order-2 md:order-4 footer-logo'>
                            <Link to={`/`} className="">
                                <p className=' text-4xl font-extrabold text-orange-300 mr-4'>Hash·Buy</p>
                            </Link>
                        </div>
                    </div>

                </div>
                <div className='max-w-screen-xl mx-auto mt-6 flex flex-col items-center'>
                    <hr className=' w-8/10 border-2 rounded-2xl border-stone-700' />
                    <p className=' w-full text-center mt-4'>Hash Buy @ All Rights Reserved.</p>
                </div>

            </footer>
        </>
    )
}