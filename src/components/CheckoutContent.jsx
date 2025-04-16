import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import currencyChange from '../js/currencyChange'
import { selectCurrency } from "../redux/currencySlice";
import twCities from '../json/TwCities.json'
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function CheckoutContent() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const targetCurrency = useSelector(selectCurrency);
    const [city, setCity] = useState(0);
    let totalCost = 0;

    cartItems.forEach(element => {
        totalCost += (currencyChange(element.currency, element.price) * element.qty);
    });

    const changeCity = () => {
        setCity(event.target.value);
    }
    return (
        <div className='max-w-screen-xl mx-auto main'>
            <h3 className=' text-center text-xl font-bold text-orange-900 dark:text-orange-300 mt-10'>結帳</h3>

            <ul className='w-full max-w-[80vw] mx-auto py-5 px-10 my-5'>
                <hr className='my-4' />
                <h4 className='text-lg font-bold text-orange-900 dark:text-orange-300 mb-2'>訂單商品</h4>
                {cartItems.map((item, index) => (
                    <li key={index} className='grid grid-cols-[1fr_1fr_auto_50px_auto] gap-x-4'>
                        <p className='text-nowrap truncate'>{item.title}</p>
                        <p>{item.variantName}</p>
                        <p>{item.qty}</p>
                        <p className=' text-right'>{currencyChange(item.currency, item.price)}</p>
                        <p>{targetCurrency}</p>
                    </li>
                ))}
                <li className=' w-full text-right flex justify-end items-baseline gap-4 mt-4'>
                    <p>小計</p>
                    <p className='text-xl font-bold text-orange-900 dark:text-orange-300'>{totalCost}</p>
                    <p>{targetCurrency}</p>
                </li>
                <hr className='my-4' />
            </ul>

            <div className=' flex flex-col md:flex-row gap-20 max-w-[80vw] mx-auto p-10'>
                <div className=' grid grid-cols-4 gap-4 w-1/2'>
                    <h4 className='col-span-4 text-lg font-bold text-orange-900 dark:text-orange-300'>購買人資訊</h4>
                    <div>
                        <p>姓</p>
                        <input type="text" className="input" />
                    </div>
                    <div className='col-span-2'>
                        <p>名</p>
                        <input type="text" className="input" />
                    </div>
                    <div className='col-span-4'>
                        <p>電子信箱</p>
                        <input type="text" placeholder="email@example.com" className="input w-full" />
                    </div>
                    <div className='col-span-4'>
                        <p>連絡電話</p>
                        <input type="text" placeholder="0912345678" className="input w-full" />
                    </div>
                    <h4 className='col-span-4'>發票地址</h4>
                    <div className='col-span-2'>
                        <p>城市</p>
                        <select defaultValue={twCities[0].name} className="select" onChange={changeCity}>
                            <option disabled={true}>城市</option>
                            {twCities.map((city, index) => (
                                <option key={index} value={index}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-2'>
                        <p>行政區</p>
                        <select defaultValue={twCities[city].districts[0].name} className="select">
                            <option disabled={true}>行政區</option>
                            {twCities[city].districts.map((district, index) => (
                                <option key={index} value={district.name}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-4'>
                        <input type="text" placeholder="請輸入詳細地址" className="input w-full" />
                    </div>
                </div>
                <div className=' grid grid-cols-4 gap-4 w-1/2'>
                    <h4 className='col-span-4 text-lg font-bold text-orange-900 dark:text-orange-300'>收件人資訊</h4>
                    <div>
                        <p>姓</p>
                        <input type="text" className="input" />
                    </div>
                    <div className='col-span-2'>
                        <p>名</p>
                        <input type="text" className="input" />
                    </div>
                    <div className='col-span-4'>
                        <p>電子信箱</p>
                        <input type="text" placeholder="email@example.com" className="input w-full" />
                    </div>
                    <div className='col-span-4'>
                        <p>連絡電話</p>
                        <input type="text" placeholder="0912345678" className="input w-full" />
                    </div>
                    <h4 className='col-span-4'>收件地址</h4>
                    <div className='col-span-2'>
                        <p>城市</p>
                        <select defaultValue={twCities[0].name} className="select" onChange={changeCity}>
                            <option disabled={true}>城市</option>
                            {twCities.map((city, index) => (
                                <option key={index} value={index}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-2'>
                        <p>行政區</p>
                        <select defaultValue={twCities[city].districts[0].name} className="select">
                            <option disabled={true}>行政區</option>
                            {twCities[city].districts.map((district, index) => (
                                <option key={index} value={district.name}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-4'>
                        <input type="text" placeholder="請輸入詳細地址" className="input w-full" />
                    </div>
                </div>
            </div>

            <div className='max-w-[80vw] mx-auto py-5 px-10 my-5 flex flex-col gap-2'>
                <h4 className='text-lg font-bold text-orange-900 dark:text-orange-300 mb-2'>取貨方式</h4>
                <label className=' flex gap-4 items-center ml-5'>
                    <input type="checkbox" checked={true} onChange={()=>('')} className="checkbox border-stone-300 bg-stone-50 dark:border-stone-600 dark:bg-stone-800 checked:bg-orange-300 checked:text-orange-900 checked:border-orange-300 " />
                    <p className='h-[1.5rem]'>宅配</p>
                </label>
            </div>

            <div className=' grid grid-cols-3 gap-4 w-full  max-w-[80vw] mx-auto p-10'>
                <h4 className='col-span-3 text-lg font-bold text-orange-900 dark:text-orange-300'>付款資訊</h4>
                <div>
                    <p>信用卡卡號</p>
                    <input type="text" placeholder='請輸入信用卡卡號' className="input" />
                </div>
                <div className='col-span-1'>
                    <p>有效日期</p>
                    <input type="text" placeholder='MM/YY' className="input" />
                </div>
                <div className='col-span-1'>
                    <p>安全碼</p>
                    <input type="text" placeholder='CVC' className="input" />
                </div>
            </div>
            <button className='w-full max-w-[80vw] mx-auto my-15'>確認付款　{totalCost}{targetCurrency}</button>
        </div>
    )
}