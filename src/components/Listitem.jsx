import { Link } from 'react-router'
import currencyChange from '../js/currencyChange'
import { useSelector } from "react-redux";
import { selectCurrency } from "../redux/currencySlice";

export default function Listitem(props) {
    const { id, title, image, price, discount, currency } = props;
    const targetCurrency = useSelector(selectCurrency);
    
    return (
        <>
            
            <div key={id} className="  h-25 w-full flex pl-4 pr-6 relative group text-stone-900 dark:text-stone-50">
                <Link to={`/products/id/` + id} className=' w-full h-full flex'>
                    <figure className=" h-2/3 w-1/4 aspect-[2/1] overflow-hidden rounded-sm self-center">
                        <img src={`/images/` + id + `/` + image} alt="商品圖" className=" h-full w-full object-cover object-center" />
                    </figure>
                    <div className='self-start mt-4 w-2/3'>
                        <p className=" h-[3rem] self-center text- ml-3 line-clamp-2">{title}</p>
                        <figure className=" absolute bottom-2 right-4 flex gap-1 items-baseline">
                            <span className={`text-stone-50 px-2 bg-red-800  dark:bg-orange-400 text-sm ${discount==1? 'hidden':''}`}>{discount * 100 == 100 ? null : `-` + (100 - discount * 100) + `%`}</span>
                            <p className=" text-right min-w-12 price font-bold text-lg">{currencyChange(currency,price)}</p>
                            <p className=' text-sm'>{targetCurrency}</p>
                        </figure>
                    </div>
                </Link>
            </div>
        </>
    )
}