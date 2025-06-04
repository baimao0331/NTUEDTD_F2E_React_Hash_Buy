import { Link } from 'react-router'
import Announcement from "../components/Announcement"
import items from "../json/items.json"
import Listitem from './Listitem'
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";

export default function HomeContent() {
    const [searchParams] = useSearchParams();
    const [toastMsg, setToastMsg] = useState(null);
    const popularItem = items.sort((a, b) => b.likes - a.likes).slice(0, 10);
    const newItem = items.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).slice(0, 10);

    useEffect(() => {
        const reason = searchParams.get("reason");

        if (reason === "notLoggedIn") {
            setToastMsg("請先登入後繼續操作");
        } else if (reason === "notVerified") {
            setToastMsg("請完成信箱驗證");
        }

        if (reason) {
            const timer = setTimeout(() => {
                setToastMsg(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);
    return (
        <>
            <main className=' main w-dvw px-10 bg-stone-100 dark:bg-stone-800'>
                <Toast message={toastMsg} />
                <Announcement />
                <div className='max-w-screen-xl mx-auto my-4 gap-5 flex flex-col md:flex-row justify-between '>
                    <ul className=' flex flex-col md:w-50/100 bg-stone-50 dark:bg-stone-700 rounded-lg pt-3'>
                        <p className=' text-lg font-bold mb-3 pl-3 text-orange-900 dark:text-orange-300'>熱門商品</p>
                        {popularItem.map(item => (
                            <li key={item.id}>
                                <hr className=' border-1 border-stone-200 dark:border-stone-600' />
                                <Listitem
                                    key={item.id}
                                    id={item.id}
                                    image={item.images[0] || item.variants[0].image}
                                    title={item.title}
                                    discount={item.discount}
                                    price={item.variants[0].price}
                                    currency={item.currency}
                                    description={item.description}
                                />
                            </li>

                        ))}
                    </ul>
                    <ul className=' flex flex-col md:w-48/100 bg-stone-50 dark:bg-stone-700 rounded-lg pt-3'>
                        <p className=' text-lg font-bold mb-3 pl-3 text-orange-900 dark:text-orange-300'>新上架</p>
                        {newItem.map(item => (
                            <li key={item.id}>
                                <hr className=' border-1 border-stone-200 dark:border-stone-600' />
                                <Listitem
                                    key={item.id}
                                    id={item.id}
                                    image={item.images[0] || item.variants[0].image}
                                    title={item.title}
                                    discount={item.discount}
                                    price={item.variants[0].price}
                                    currency={item.currency}
                                    description={item.description}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}