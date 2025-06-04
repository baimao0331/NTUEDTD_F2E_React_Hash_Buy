import { useDispatch, useSelector } from 'react-redux';
import { selectCurrency } from "../redux/currencySlice";
import twCities from '../json/TwCities.json';
import { useRef, useEffect, useState, use } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { Link } from 'react-router';
import { CircleHelp } from 'lucide-react';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../api";
import { useQuery } from '@tanstack/react-query';

export default function CheckoutContent() {
    const user = auth.currentUser;

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
        familyName: "",
        givenName: '',
        tel: '',
        email: '',
        address: '',
        gender: '',
        birthday: "",
        cityId: 0,
        cityName: "",
        districtId: 0,
        districtName: "",
    }, user);

    useEffect(() => {
        const selectedCity = twCities[user.cityId || 0];
        const selectedDistrict = selectedCity.districts[user.districtId || 0];
        if (user) {
            setBuyer((prev) => ({
                ...prev,
                familyName: user.familyName || '',
                givenName: user.givenName || '',
                tel: user.tel || '',
                email: user.email || '',
                address: user.address || '',
                gender: user.gender || '',
                birthday: "",
                cityId: user.cityId || 0,
                cityName: selectedCity?.name || "",
                districtId: user.districtId || 0,
                districtName: selectedDistrict?.name || "",
            }));
        }
    }, [user]);

    useEffect(() => {
        if (year && month && day) {
            const paddedMonth = String(month).padStart(2, "0");
            const paddedDay = String(day).padStart(2, "0");
            const birthdayStr = `${year}-${paddedMonth}-${paddedDay}`; // YYYY-MM-DD

            setBuyer((prev) => ({
                ...prev,
                birthday: birthdayStr,
            }));
        }
    }, [year, month, day]);


    const handleResentMail = (e) => {
        const mailUser = auth.currentUser;
        sendEmailVerification(mailUser);
    }

    const handleSubmit = async () => {
        const auth = getAuth();
        const currentuser = auth.currentUser;
        try {
            const ref = doc(db, "users", currentuser.uid); // 將資料存到 users/{uid}

            await setDoc(ref, buyer, { merge: true }); // merge: true → 不會覆蓋整份資料

            alert("✅ 資料儲存成功！");
        } catch (err) {
            console.error("❌ 資料儲存失敗:", err);
            alert("儲存失敗，請稍後再試");
        }
    };

    //將使用者資料同步過來
    const fetchUserData = async (uid) => {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) throw new Error("找不到使用者資料");
        return snap.data();
    };
    const { data: userData, isLoading, error } = useQuery({
        queryKey: ['userData', user?.uid],
        queryFn: () => fetchUserData(user.uid),
        enabled: !!user, // 確保登入後才執行
    });

    useEffect(() => {
        if (user && userData) {
            const selectedCity = twCities[userData.cityId || 0];
            const selectedDistrict = selectedCity?.districts[userData.districtId || 0];

            setBuyer((prev) => ({
                ...prev,
                ...userData,
                email: user.email || userData.email,
                cityName: selectedCity?.name || '',
                districtName: selectedDistrict?.name || '',
            }));
        }
    }, [user, userData]);
    useEffect(() => {
        if (userData?.birthday) {
            const [y, m, d] = userData.birthday.split('-').map(Number);
            setYear(y);
            setMonth(m);
            setDay(d);
        }
    }, [userData]);

    console.log(buyer);

    return (
        <div className='max-w-screen-xl mx-auto main'>
            <div className=' px-8 py-4 w-8/10 bg-stone-50 dark:bg-stone-700 mx-auto rounded-xl border border-stone-300 dark:border-stone-600'>
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
                                <button className=' !h-8 leading-1 !rounded-4xl disabled:!bg-stone-500'
                                    onClick={handleResentMail}
                                    disabled={user.emailVerified ? true : false}
                                >{user.emailVerified ? "已完成驗證" : "重新寄送驗證信"}</button>
                            </div>
                            <hr className=' border-1 border-stone-300 dark:border-stone-600 w-full' />
                        </div>
                        <div className=' flex flex-col md:flex-row gap-20 max-w-[80vw] mx-auto p-10'>
                            <div className=' grid grid-cols-8 gap-4 w-full'>
                                <div className=' col-span-8 flex gap-8 items-center'>
                                    <h4 className=' text-lg font-bold text-orange-900 dark:text-orange-300'>編輯會員資料</h4>
                                    <div className="tooltip flex gap-2" data-tip="完成資料填寫可加快您結帳的速度">
                                        <CircleHelp className=' cursor-pointer' />
                                    </div>
                                </div>
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
                                    <div className=' flex gap-8 py-2'>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={buyer.gender === "male"}
                                                className="radio bg-stone-300 dark:bg-stone-600 checked:bg-orange-300 checked:text-stone-50 dark:checked:text-stone-700 checked:border-ornage-300"
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
                                                className="radio bg-stone-300 dark:bg-stone-600 checked:bg-orange-300 checked:text-stone-50 dark:checked:text-stone-700 checked:border-ornage-300"
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
                                                className="radio bg-stone-300 dark:bg-stone-600 checked:bg-orange-300 checked:text-stone-50 dark:checked:text-stone-700 checked:border-ornage-300"
                                                onChange={(e) =>
                                                    setBuyer({ ...buyer, gender: e.target.value })
                                                }
                                            />
                                            其他/不願透漏
                                        </label>
                                    </div>
                                </div>
                                <h4 className='col-span-8 font-black mt-4'>生日</h4>
                                <div className='col-span-2'>
                                    <p>年</p>
                                    <select name="birthday" id="year" className=' select' value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                                        {years.map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-span-1'>
                                    <p>月</p>
                                    <select name="birthday" id="month" className=' select' value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                                        {months.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-span-1'>
                                    <p>日</p>
                                    <select name="birthday" id="day" className=' select' value={day} onChange={(e) => setDay(parseInt(e.target.value))}>
                                        {days.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
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
                                <div className='col-span-2'>
                                    <p>城市</p>
                                    <select
                                        name="cityId"
                                        value={buyer.cityId}
                                        className=' select'
                                        onChange={(e) => {
                                            const selectedId = Number(e.target.value);
                                            const selectedCity = twCities[selectedId];

                                            setBuyer((prev) => ({
                                                ...prev,
                                                cityId: selectedId,
                                                cityName: selectedCity.name,
                                                districtId: 0,
                                                districtName: "",
                                            }));
                                        }}
                                    >
                                        <option value="" disabled>城市</option>
                                        {twCities.map((city, index) => (
                                            <option key={index} value={index}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-span-2'>
                                    <p>行政區</p>
                                    <select
                                        name='districtId'
                                        value={buyer.districtId}
                                        className="select"
                                        onChange={(e) => {
                                            const selectedId = Number(e.target.value);
                                            const selectedDistrict = twCities[buyer.cityId].districts[selectedId];

                                            setBuyer((prev) => ({
                                                ...prev,
                                                districtId: selectedId,
                                                districtName: selectedDistrict.name,
                                            }));
                                        }}

                                    >
                                        <option value="" disabled>行政區</option>
                                        {twCities[buyer.cityId].districts.map((district, index) => (
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
                                <button className=' col-span-8 mt-8'
                                    onClick={handleSubmit}>儲存修改</button>
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