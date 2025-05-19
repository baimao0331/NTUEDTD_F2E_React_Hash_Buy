import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import currencyChange from '../js/currencyChange';
import { selectCurrency } from "../redux/currencySlice";
import twCities from '../json/TwCities.json';
import { useRef, useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../api/index'
import { Link } from 'react-router';
import { CircleHelp } from 'lucide-react';

export default function CheckoutContent() {
    const user = useSelector((state) => state.auth.user);
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const targetCurrency = useSelector(selectCurrency);

    const [year, setYear] = useState(2000);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);

    const currentYear = new Date().getFullYear() - 13;
    const years = [];
    const months = [];

    for (let y = currentYear; y >= 1900; y--) {
        years.push(y);
    }
    for (let m = 1; m <= 12; m++) {
        months.push(m);
    }

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getDaysInMonth = (y, m) => {
        if (m === 2) {
            return isLeapYear(y) ? 29 : 28;
        }
        return [4, 6, 9, 11].includes(m) ? 30 : 31;
    };

    const days = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

    const [buyer, setBuyer] = useState({
        familyName: '',
        givenName: '',
        tel: '',
        email: '',
        address: '',
        gender: '',
        city: 0,
        district: 0,
    });

    console.log(user);

    return (
        <div className='max-w-screen-xl mx-auto main'>
            <div className=' px-8 py-4 w-[80vw] bg-stone-50 dark:bg-stone-700 mx-auto rounded-xl'>
                {user ? (
                    <>
                        <h3 className=' text-center text-xl font-bold text-orange-900 dark:text-orange-300 mt-10'>設定</h3>
                        <div className=' flex flex-col max-w-[80vw] mx-auto p-8 gap-4'>
                            <h4 className='text-lg font-bold text-orange-900 dark:text-orange-300'>帳號設定</h4>
                            <hr className=' border-1 border-stone-300 dark:border-stone-600 w-full' />
                            <div className=' flex gap-8 items-center'>
                                <p className=' text-orange-400 dark:text-orange-300 font-bold'>暱稱</p>
                                <p>{user.displayName}</p>
                                <button className=' !h-8 leading-1 !rounded-4xl'>修改</button>
                            </div>
                            <div className=' flex gap-8 items-center'>
                                <p className=' text-orange-400 dark:text-orange-300 font-bold'>信箱</p>
                                <p>{user.email}</p>
                                <button className=' !h-8 leading-1 !rounded-4xl'>修改</button>
                            </div>
                            <div className=' flex gap-8 items-center'>
                                <p className=' text-orange-400 dark:text-orange-300 font-bold'>驗證</p>
                                <p>{user.emailVerified ? "已完成" : "尚未完成"}</p>
                                <div className="tooltip flex gap-2" data-tip="若已完成驗證卻顯示尚未完成請嘗試重新登入">
                                    <CircleHelp className=' cursor-pointer' />
                                    <p className=' lg:hidden'>若已完成驗證卻顯示尚未完成請嘗試重新登入</p>
                                </div>
                            </div>
                            <hr className=' border-1 border-stone-300 dark:border-stone-600 w-full' />
                        </div>
                        <div className=' flex flex-col md:flex-row gap-20 max-w-[80vw] mx-auto p-10'>
                            <div className=' grid grid-cols-8 gap-4 w-full'>
                                <h4 className='col-span-8 text-lg font-bold text-orange-900 dark:text-orange-300'>編輯會員資料</h4>
                                <div className='col-span-1'>
                                    <p className='font-black mt-4'>姓</p>
                                    <input
                                        name="familyName"
                                        className=' input'
                                        value={buyer.familyName}
                                        onChange={(e) => setBuyer({ ...buyer, [e.target.name]: e.target.value })}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <p className='font-black mt-4'>名</p>
                                    <input
                                        name="givenName"
                                        className=' input'
                                        value={buyer.givenName}
                                        onChange={(e) => setBuyer({ ...buyer, [e.target.name]: e.target.value })}
                                    />
                                </div>
                                <span className='col-span-1'></span>
                                <div className='col-span-4'>
                                    <p className='font-black mt-4'>性別</p>
                                    <div className=' flex gap-8'>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={buyer.gender === "male"}
                                                onChange={(e) =>
                                                    setBuyer({ ...buyer, gender: e.target.value })
                                                }
                                            />
                                            男性
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={buyer.gender === "female"}
                                                onChange={(e) =>
                                                    setBuyer({ ...buyer, gender: e.target.value })
                                                }
                                            />
                                            女性
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                checked={buyer.gender === "other"}
                                                onChange={(e) =>
                                                    setBuyer({ ...buyer, gender: e.target.value })
                                                }
                                            />
                                            其他/不願透漏
                                        </label>
                                    </div>
                                </div>
                                <h4 className='col-span-8 font-black mt-4'>生日</h4>
                                <div className='col-span-1'>
                                    <p>年</p>
                                    <select name="birthday" id="year" className=' select' onChange={(e) => setYear(parseInt(e.target.value))}>
                                        {years.map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-span-1'>
                                    <p>月</p>
                                    <select name="birthday" id="month" className=' select' onChange={(e) => setMonth(parseInt(e.target.value))}>
                                        {months.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-span-1'>
                                    <p>日</p>
                                    <select name="birthday" id="day" className=' select' onChange={(e) => setDay(parseInt(e.target.value))}>
                                        {days.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                                <span className='col-span-1'></span>
                                <div className='col-span-4'>
                                    <p className='font-black'>連絡電話</p>
                                    <input
                                        name="tel"
                                        className=' input w-full'
                                        value={buyer.tel}
                                        onChange={(e) => setBuyer({ ...buyer, [e.target.name]: e.target.value })}
                                    />
                                </div>
                                <h4 className='col-span-8 font-black mt-4'>聯絡地址</h4>
                                <div className='col-span-1'>
                                    <p>城市</p>
                                    <select
                                        name="city"
                                        value={buyer.city}
                                        className=' select'
                                        onChange={(e) =>
                                            setBuyer({ ...buyer, [e.target.name]: Number(e.target.value) })
                                        }
                                    >
                                        <option disabled={true}>城市</option>
                                        {twCities.map((city, index) => (
                                            <option key={index} value={index}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-span-1'>
                                    <p>行政區</p>
                                    <select
                                        name='district'
                                        value={buyer.district}
                                        className="select"
                                        onChange={(e) =>
                                            setBuyer({ ...buyer, [e.target.name]: Number(e.target.value) })
                                        }
                                    >
                                        <option disabled={true}>行政區</option>
                                        {twCities[buyer.city].districts.map((district, index) => (
                                            <option key={index} value={index}>{district.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-span-4'>
                                    <p>詳細地址</p>
                                    <input
                                        name="address"
                                        className=' input w-full'
                                        value={buyer.address}
                                        placeholder='請輸入詳細地址'
                                        onChange={(e) => setBuyer({ ...buyer, [e.target.name]: e.target.value })}
                                    />
                                </div>
                                <button className=' col-span-8 mt-8'>儲存修改</button>
                            </div>
                        </div>

                    </>
                ) : (
                    <div className='flex flex-col gap-4 p-8'>
                        <p className=' justify-self-center text-xl text-center'>您尚未登入帳號</p>
                        <Link to={`/account/login`}>
                            <p className=' text-orange-400 dark:text-orange-300 cursor-pointer text-center'>點我去登入</p>
                        </Link>
                    </div>
                )

                }

            </div>


        </div>
    )
}