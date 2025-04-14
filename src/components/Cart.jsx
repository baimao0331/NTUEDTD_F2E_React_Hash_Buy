import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, updateQty, removeItem } from '../redux/cartSlice';
import { Plus, Minus, ShoppingCart ,X } from 'lucide-react';

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    console.log(cartItems);

    return (
        <div className='max-w-screen-xl mx-auto '>
            <ul className='w-full'>
                <li className=' my-5 flex justify-self-center items-center gap-2 text-xl title'><ShoppingCart size={28}/><p className=' font-bold'>{cartItems.length == 0? "購物車裡尚沒有商品喔":"購物車"}</p></li>
                {cartItems.map((item, index) =>
                (
                    <li key={index} className=" listitem h-25 w-full min-w-200 flex items-center pl-10 pr-6 relative mb-4 rounded-lg shadow-md group">
                        <X className=' absolute left-2 text-stone-300'
                            onClick={()=>{
                                dispatch(removeItem({id:item.id, variantID: item.variantID}));
                            }}/>
                        <figure className=" h-2/3 w-1/6 aspect-2/1 overflow-hidden rounded-xl">
                            <img src={`/images/` + item.id + `/` + item.image} alt="商品圖" className=" h-full w-full object-cover object-center" />
                        </figure>
                        <div className=' flex flex-col w-3/6 ml-3 self-center'>
                            <p className=" h-[1.5rem] w-80 text-nowrap truncate text-sm">{item.title}</p>
                            <p className='text-sm'>{item.variantName}</p>
                        </div>

                        {/*數量選擇 */}
                        <div className=" inline-flex w-1/6 h-1/4 rounded-md shadow-sm">
                            <button className=" btn !h-full !px-2 no-round !rounded-l-md !rounded-r-none !bg-stone-200 dark:!bg-stone-700"
                                onClick={()=>{
                                    const newQty = Math.max(1, item.qty - 1);
                                    dispatch(updateQty({id:item.id, variantID: item.variantID, qty: newQty}));
                                }}>
                                <Minus className=" dark:!text-stone-50 size-4" />
                            </button>
                            <div className="flex items-center flex-1 bg-stone-50 dark:bg-stone-600"><p className=" text-center w-full text-sm">{item.qty}</p></div>
                            <button className=" btn !h-full !px-2 no-round !rounded-r-md !rounded-l-none !bg-stone-200 dark:!bg-stone-700"
                                onClick={()=>{
                                    const newQty = Math.min(item.stock, item.qty + 1);
                                    dispatch(updateQty({id:item.id, variantID: item.variantID, qty: newQty}));
                                }}>
                                <Plus className=" dark:!text-stone-50 size-4" />
                            </button>
                        </div>
                        
                        <figure className=" w-1/6 flex gap-1 justify-end items-baseline">
                            <p className=" text-right min-w-12 price font-bold text-xl">{item.price}</p>
                            <p>TWD</p>
                        </figure>
                    </li>
                )
                )}
            </ul>

        </div>
    )
}