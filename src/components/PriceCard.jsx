import currencyChange from '../js/currencyChange'
import { useSelector } from "react-redux";
import { selectCurrency } from "../redux/currencySlice";

export default function PriceCard(props) {
    const { item, isDiscount, selectedVariantId } = props;
    const targetCurrency = useSelector(selectCurrency);
    console.log(isDiscount);
    
    return (
        <div className=" w-6/10 md:w-1/2 p-4 bg-stone-50 dark:bg-stone-700 shadow-lg rounded-md flex flex-col justify-between">

            {/* 折扣資訊 */}
            <div>
                <div className=" flex flex-col sm:flex-row sm:justify-between items-center text-nowrap md:text-xs lg:text-base">
                    {isDiscount ? <p className=" order-2 sm:order-0 text-orange-700 dark:text-orange-400 font-bold w-full">特價至${item.discount_end.replaceAll("-", "/")}</p>:<p>這個商品暫時沒有特價...</p>}
                    {isDiscount ?
                        <span className=" text-stone-50 bg-orange-700 dark:bg-orange-400 px-2 rounded-sm h-[1.5rem] mt-0.5 pt-0.5 font-normal text-sm w-full sm:w-auto">
                            {`${100 - item.discount * 100}% off`}
                        </span>:
                         <></>}
                </div>
                <hr className="my-2 w-full" />
            </div>

            {/* 價格資訊 */}
            <div className=" w-full">
                <div className="w-full grid grid-cols-2 text-lg md:text-right">
                    <p className=" text-nowrap text-left">原始價格</p>
                    <p className=" text-right">
                        {currencyChange(item.currency, item.variants[selectedVariantId].price)} 
                        {targetCurrency}
                    </p>
                    <p className=" col-span-2 grid-cols-subgrid text-right text-sm text-stone-600 dark:text-stone-400">{item.variants[selectedVariantId].price}{item.currency}</p>
                </div>

                <div className="w-full grid grid-cols-2 text-lg md:text-right items-baseline">
                    <p className=" text-nowrap text-left">當前價格</p>
                    <div className=" flex items-baseline justify-end">
                        <p className=" text-2xl font-bold price">
                            {targetCurrency=="USD"? 
                            (currencyChange(item.currency, item.variants[selectedVariantId].price) * item.discount).toFixed(2):Math.round(currencyChange(item.currency, item.variants[selectedVariantId].price) * item.discount)}
                        </p>
                        <p className="ml-1 text-right">{targetCurrency}</p>
                        
                    </div>
                    <p className=" col-span-2 grid-cols-subgrid text-right text-sm text-stone-600 dark:text-stone-400">{Math.round(item.variants[selectedVariantId].price * item.discount)}{item.currency}</p>
                </div>
                
            </div>
        </div>
    )
}