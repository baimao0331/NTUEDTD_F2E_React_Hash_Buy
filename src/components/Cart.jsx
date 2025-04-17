import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, updateQty, removeItem } from '../redux/cartSlice';
import { Plus, Minus, ShoppingCart, X } from 'lucide-react';
import sortCurrencyChange from '../js/sortCurrencyChange'
import currencyChange from '../js/currencyChange'
import { selectCurrency } from "../redux/currencySlice";
import { Link } from 'react-router';
import { useMemo } from 'react';

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const targetCurrency = useSelector(selectCurrency);
    const totalCost = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + sortCurrencyChange(item.currency, targetCurrency, item.price) * item.qty * item.discount;
        }, 0);
    }, [cartItems, targetCurrency]);
    return (
        <div className='max-w-screen-xl mx-auto w-full px-10'>
            <ul className={`rounded-lg flex flex-col w-full justify-center py-10 px-5 ${cartItems.length == 0 ? '' : 'bg-stone-50 dark:bg-stone-700'}`}>
                <li className=' my-5 flex mx-auto items-center gap-2 text-xl text-orange-900 dark:text-orange-300'>
                    <ShoppingCart size={28} />
                    <p className=' font-bold'>{cartItems.length == 0 ? "購物車裡尚沒有商品喔" : "購物車"}</p>
                </li>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <li key={index}>
                        <hr className='border-1 border-stone-300 dark:border-stone-600 my-2' />
                        <div className="  h-25 lg:w-8/10 mx-auto grid grid-cols-[1fr_auto_1fr_auto] md:grid-rows-2 lg:grid-cols-[100px_1fr_120px_80px] gap-x-5 md:gap-x-10 items-center pl-10 pr-6 relative mb-4">
                            <X className=' absolute left-2 text-stone-300 cursor-pointer'
                                onClick={() => {
                                    dispatch(removeItem({ id: item.id, variantID: item.variantID }));
                                }} />
                            {/*圖片 */}
                            <figure className=" order-1 col-span-1 row-span-2 lg:order-0 lg:row-span-2 aspect-3/2 md:aspect-2/1 overflow-hidden rounded-xl w-full]">
                                <img src={`/images/` + item.id + `/` + item.image} alt="商品圖" className=" h-full w-full object-cover object-center" />
                            </figure>

                            {/*標題 */}
                            <div className=' order-2 col-span-2 lg:order-1 lg:col-span-1 lg:row-span-2 w-full lg:w-[350px] flex flex-col '>
                                <Link to={`/products/id/` + item.id}>
                                    <p className=" h-[1.5rem] text-nowrap truncate text-sm">{item.title}</p>
                                </Link>
                                <p className='text-sm'>{item.variantName}</p>
                            </div>

                            {/*數量選擇 */}
                            <div className="order-4 col-span-2 lg:col-span-1 lg:order-2 inline-flex h-1/2 lg:h-1/3 w-2/3 lg:w-full lg:row-span-2 rounded-md border-1 border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-600">
                                <button className=" btn shadow-none !h-full !px-2 no-round !rounded-l-md !rounded-r-none !bg-stone-200 dark:!bg-stone-700"
                                    onClick={() => {
                                        const newQty = Math.max(1, item.qty - 1);
                                        dispatch(updateQty({ id: item.id, variantID: item.variantID, qty: newQty }));
                                    }}>
                                    <Minus className=" dark:!text-stone-50 size-4" />
                                </button>
                                <div className="flex items-center flex-1"><p className=" w-full text-center  text-sm">{item.qty}</p></div>
                                <button className=" btn shadow-none !h-full !px-2 no-round !rounded-r-md !rounded-l-none !bg-stone-200 dark:!bg-stone-700"
                                    onClick={() => {
                                        const newQty = Math.min(item.stock, item.qty + 1);
                                        dispatch(updateQty({ id: item.id, variantID: item.variantID, qty: newQty }));
                                    }}>
                                    <Plus className=" dark:!text-stone-50 size-4" />
                                </button>
                            </div>

                            <figure className=" order-3 col-span-1 row-span-2 lg:order-3 lg:row-span-2 flex gap-1 items-baseline">
                                <p className=" text-right min-w-12 price font-bold text-xl">{sortCurrencyChange(item.currency, targetCurrency, item.price) * item.qty * item.discount}</p>
                                <p className=' ml-1'>{targetCurrency}</p>
                            </figure>
                        </div>
                    </li>
                    ))
                ) : (
                    <p className="text-center text-stone-500">購物車是空的喔</p>
                )}

                {cartItems.length == 0 ? "" :
                    <div className=' justify-end flex items-baseline gap-2 my-4 w-full lg:w-8/10 mx-auto'>
                        <p>小計</p>
                        <p className='text-xl font-bold text-orange-900 dark:text-orange-300'>{totalCost}</p>
                        <p>{targetCurrency}</p>
                    </div>
                }
                {cartItems.length == 0 ? "" :
                    <Link to={`/checkout`} className=' w-full flex'>
                        <button className='w-full lg:w-8/10 mx-auto'>前往結帳</button>
                    </Link>
                }
            </ul>

        </div>
    )
}