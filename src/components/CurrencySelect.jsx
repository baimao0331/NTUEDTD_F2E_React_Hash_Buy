import { useDispatch, useSelector } from "react-redux";
import { selectCurrency, updateCurrency } from "../redux/currencySlice";

export default function CurrencySelect() {
    const dispatch = useDispatch();
    const currency = useSelector(selectCurrency);

    const currencyChange = (value) => {
        dispatch(updateCurrency(value));
    };

    return (
        <>
            <span className=" text-nowrap">使用幣值 : </span>
            <select
                value={currency}
                onChange={(event) => currencyChange(event.target.value)}
                className="select shadow-none h-8 focus:outline-none ml-1 border-0 bg-stone-300 dark:bg-stone-600 cursor-pointer">
                <option value='TWD' className='dark:bg-stone-600'>TWD</option>
                <option value='JPY' className='dark:bg-stone-600'>JPY</option>
                <option value='USD' className=' dark:bg-stone-600'>USD</option>
            </select>
        </>
    );
}
