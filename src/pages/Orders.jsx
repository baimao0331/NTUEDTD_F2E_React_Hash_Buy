import { Helmet } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import LoadingHash from '../components/LoadingHash';
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../api/index";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Orders() {
    const [user, loadingAuth] = useAuthState(auth);

    const fetchOrdersByUser = async (uid) => {
        const q = query(collection(db, "orders"), where("userId", "==", uid));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['orders', user?.uid],
        queryFn: () => fetchOrdersByUser(user.uid),
        enabled: !!user?.uid && !loadingAuth
    });

    if (loadingAuth || isLoading)
        return (<div className="w-screen h-screen bg-stone-800 text-gray-100 flex flex-col items-center justify-center gap-4">
            <p className=' text-2xl'>驗證中...</p>
            <LoadingHash />
        </div>);
    if (error) return <p>錯誤：{error.message}</p>;
    if (!orders?.length)
        return (
            <>
                <Header />
                <div className="max-w-screen-xl mx-auto  bg-stone-50 dark:bg-stone-700 rounded-xl p-8 border border-stone-300 dark:border-stone-600 rounded-xl shadow w-2/3 py-8 px-24 ">
                    <div className=" w-8/10 lg:w-1/2 mx-auto flex flex-col justify-center">
                        <h3 className=' font-bold text-center my-5 flex mx-auto items-center gap-2 text-xl text-orange-900 dark:text-orange-300'>
                            你的訂單
                        </h3>
                        <hr className="w-1/4 border-orange-300 border-3 mt-4 rounded-2xl mx-auto mb-4" />
                        <p className=" text-center">您目前還沒有訂單</p>
                    </div>
                </div>
                <Footer />
            </>
        );

    return (
        <>
            <Header />
            <div className=" max-w-screen-xl mx-auto w-8/10">
                <div className=" bg-stone-50 dark:bg-stone-700 rounded-xl p-8 border border-stone-300 dark:border-stone-600">
                    <div className="lg:w-1/2 mx-auto flex flex-col justify-center">
                        <h3 className=' font-bold text-center my-5 flex mx-auto items-center gap-2 text-xl text-orange-900 dark:text-orange-300'>
                            你的訂單
                        </h3>
                        <hr className="w-1/4 border-orange-300 border-3 mt-4 rounded-2xl mx-auto mb-4" />
                    </div>
                    <ul className=" flex flex-col gap-4">
                        {orders.map(order => (
                            <li key={order.id} className=" flex flex-col my-2 md:w-8/10 mx-auto">
                                <div className="collapse  collapse-arrow border border-stone-300 dark:border-stone-600">
                                    <input type="checkbox" />
                                    <div className="collapse-title flex flex-col gap-2 md:flex-row md:justify-between">
                                        <div className=" flex md:gap-2 flex-col"><p>訂單編號</p><p className=" font-black">{order.id}</p></div>
                                        <div className=" flex flex-row gap-2 text-sm md:text-md md:flex-col"><p>訂購日期</p><p>{order.createdAt?.toDate().toLocaleString()}</p></div>
                                        <div className=" flex flex-row gap-2 justify-between md:flex-col"><p>總價</p><p className=" text-orange-900 dark:text-orange-300 font-bold">{order.total}{order.items[0].currency}</p></div>
                                        </div>
                                    <div className="collapse-content">
                                        <hr  className=" my-2  border-stone-300 dark:border-stone-600"/>
                                        <div className=" w-full grid grid-cols-[2fr_1fr_1fr] ">
                                            <p className=" truncate">商品名</p>
                                            <p className=" text-center">數量</p>
                                            <div className=" flex gap-2 justify-end mr-10">
                                                <p>價格</p>
                                            </div>
                                        </div>
                                        <ul className=" flex flex-col gap-2 mt-4">{order.items.map((item, index) => (
                                            <li key={index} className=" flex gap-4">
                                                <div className=" w-full grid grid-cols-[2fr_1fr_1fr]">
                                                    <p className=" truncate">{item.title}</p>
                                                    <p className=" text-center">{item.qty}</p>
                                                    <div className=" flex gap-2 justify-end  mr-10">
                                                        <p>{item.price}</p>
                                                        <p>{item.currency}</p>
                                                    </div>
                                                    <p className="ml-2">{item.variantName}</p>
                                                </div>
                                            </li>))}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>

    );
}