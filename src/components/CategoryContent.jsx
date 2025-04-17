import { useParams } from 'react-router';
import items from "../json/items.json";
import Listitem from './Listitem'
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { selectCurrency } from "../redux/currencySlice";
import sortCurrencyChange from '../js/sortCurrencyChange'


export default function CategoryContent() {
    const param = useParams();
    console.log(param.categoryName);

    //初始化排序
    const [displayItems, setDisplayItems] = useState([]);
    const [sortMode, setSortMode] = useState('relative');

    const targetCurrency = useSelector(selectCurrency);

    const normalizeString = (str) =>
        str
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '') // 移除所有空白
          .replace(/[^\p{L}\p{N}]/gu, ''); // 移除符號，只保留文字與數字

    useEffect(() => {
        const result = items.filter(item => normalizeString(item.itemType) === normalizeString(param.categoryName));
        const newResult = result.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        setDisplayItems(newResult);
        
    }, [param.categoryName]);
    console.log(displayItems);
    //重新排序
    const handleSort = (value) => {
        setSortMode(value);
        const nextList = [...displayItems];
        console.log(nextList);
        switch (value) {
            case 'newToOld':
                setDisplayItems(nextList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
                break;
            case 'oldToNew':
                setDisplayItems(nextList.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)));
                break;
            case 'highToLow':
                setDisplayItems(nextList.sort((a, b) => Math.round(sortCurrencyChange(a.currency, targetCurrency, a.variants[0].price) * a.discount) - Math.round(sortCurrencyChange(b.currency, targetCurrency, b.variants[0].price) * b.discount)));
                break;
            case 'lowToHigh':
                setDisplayItems(nextList.sort((a, b) => Math.round(sortCurrencyChange(b.currency, targetCurrency, b.variants[0].price) * b.discount) - Math.round(sortCurrencyChange(a.currency, targetCurrency, a.variants[0].price) * a.discount)));
                break;
        };
    };

    return (
        <div className='max-w-screen-xl mx-auto px-10 w-full'>
            <h2 className=' text-lg font-bold my-4 w-full text-center text-orange-900 dark:text-orange-300'>{param.categoryName}</h2>
            <div className=" flex items-center my-4">
                <span className=" text-nowrap">使用幣值 : </span>
                <select
                    defaultValue={sortMode}
                    onChange={(event) => handleSort(event.target.value)}
                    className="select shadow-none h-8 focus:outline-none ml-1 mt-0.5 border-0 bg-stone-300 dark:bg-stone-600 cursor-pointer">
                    <option value='newToOld' className='dark:bg-stone-600'>由新到舊</option>
                    <option value='oldToNew' className='dark:bg-stone-600'>由舊到新</option>
                    <option value='highToLow' className=' dark:bg-stone-600'>由價格低到高</option>
                    <option value='lowToHigh' className=' dark:bg-stone-600'>由價格高到低</option>
                </select>
            </div>

            <ul className=' grid grid-cols-1 lg:grid-cols-2 gap-10'>
                {displayItems.map((item) => (
                    <div key={item.id}>
                        <hr className=' border-1 border-stone-200 dark:border-stone-600' />
                        <Listitem
                            key={item.id}
                            id={item.id}
                            image={item.images[0]}
                            title={item.title}
                            discount={item.discount}
                            price={item.variants[0].price}
                            currency={item.currency}
                        />
                    </div>
                ))}
            </ul>
        </div>
    )
}