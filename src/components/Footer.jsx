import { Link } from 'react-router'


export default function Footer() {

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; //黑暗模式偵測

    return (
        <>
            <footer className=" bg-stone-600 text-stone-100 w-dvw px-10 py-8">
                <div className=" max-w-screen-xl mx-auto flex justify-between ">
                    <div className=" flex">
                        <ul className="flex flex-col gap-1">
                            <p className=" font-bold text-base">網站導覽</p>
                            <li>首頁</li>
                            <li>搜尋</li>
                            <li>3D模型</li>
                            <li>周邊商品</li>
                        </ul>
                        <ul className="flex flex-col gap-1 ml-16">
                            <p className=" font-bold text-base">網站設定</p>
                            <li>黑暗模式 : <input type="checkbox" defaultChecked={isDarkMode} className="toggle toggle-xs" /></li>
                            <li className=" flex items-center">
                                <span className=" text-nowrap">使用幣值 :</span>
                                <select defaultValue="TWD" className="select select-ghost h-8 focus:bg-stone-600 focus:outline-none hover:bg-stone-500">
                                    <option>TWD</option>
                                    <option>JPY</option>
                                    <option>USD</option>
                                </select>
                            </li>
                        </ul>
                        <ul className="flex flex-col gap-1 ml-10">
                            <p className=" font-bold text-base">聯絡我們</p>
                            <li>s111219028@stu.ntue.edu.tw</li>
                            <li>s111219014@stu.ntue.edu.tw</li>
                        </ul>
                    </div>
                    <div className=' logo'>
                        <Link to={`/`} className="">
                            <p className=' text-4xl font-extrabold text-orange-300 mr-4'>Hash·Buy</p>
                        </Link>
                    </div>
                </div>
                <div className='max-w-screen-xl mx-auto mt-6 flex flex-col items-center'>
                    <hr className=' w-8/10 border-2 rounded-2xl border-stone-700'/>
                    <p className=' w-full text-center mt-4'>Hash Buy @ All Rights Reserved.</p>
                </div>

            </footer>
        </>
    )
}