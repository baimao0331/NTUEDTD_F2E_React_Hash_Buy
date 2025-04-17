import { useParams } from 'react-router';
import items from "../json/items.json";
import { findBestMatch } from "string-similarity";
import Listitem from './Listitem'
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { selectSearchHistory, newHistory, clearHistory } from '../redux/searchSlice'
import { selectCurrency } from "../redux/currencySlice";
import sortCurrencyChange from '../js/sortCurrencyChange'


export default function SearchResult() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();

    //初始化排序
    const [displayItems, setDisplayItems] = useState([]);
    const [sortMode, setSortMode] = useState('relative');
    const [keyword, setKeyword] = useState('');

    const inputRef = useRef();
    const history = useSelector(selectSearchHistory);
    const targetCurrency = useSelector(selectCurrency);

    useEffect(() => {
        const titles = items.map(x => x.title);
        const result = findBestMatch(param.keyword, titles);
        const ratedItems = items.map((item, index) => ({
            ...item,
            similarity: result.ratings[index].rating
        }));
        const newSimilarItems = ratedItems
            .filter(x => x.similarity > 0.01)
            .sort((a, b) => b.similarity - a.similarity);

        setDisplayItems(newSimilarItems);
        setKeyword(''); // 可選：搜尋後清空 input
    }, [param.keyword]);


    //搜尋
    const handleSearch = (e) => {
        e.preventDefault(); // 防止重新整理
        if (keyword.trim() !== '') {
            dispatch(newHistory(keyword));
            navigate(`/results/${encodeURIComponent(keyword.trim())}`); // 將字串轉換為網址能用的格式
        }
    };

    //重新排序
    const handleSort = (value) => {
        setSortMode(value);
        const nextList = [...displayItems];
        console.log(nextList);
        switch (value) {
            case 'relative':
                setDisplayItems(nextList.sort((a, b) => b.similarity - a.similarity));
                break;
            case 'newToOld': similarItems;
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
            <form onSubmit={handleSearch} className=' flex flex-col mt-10 mb-5 w-full gap-4'>
                <div className='flex'>
                    <label className="input bg-stone-50 border-0 dark:bg-stone-700 w-full">
                        <input type="search"
                            ref={inputRef}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            required
                            placeholder={param.keyword}
                            className=' text-stone-900 font-bold dark:text-stone-50' />
                    </label>
                    <button className=' !px-5 !py-0 ml-4'>
                        <Search size='30' className=" text-orange-900" />
                    </button>
                </div>

                <ul className=' flex items-center text-stone-900 dark:text-stone-50'>
                    <li className=''>搜尋歷史：</li>
                    {history.map((keyword, index) => (
                        <li key={index}>
                            {<Link
                                to={`/results/${keyword}`}
                                className="block px-3 py-1 rounded hover:bg-stone-300 dark:hover:bg-stone-600"
                            >
                                {keyword}
                            </Link>}
                        </li>
                    ))}
                </ul>
                <div className=" flex items-center">
                    <span className=" text-nowrap">使用幣值 : </span>
                    <select
                        defaultValue={sortMode}
                        onChange={(event) => handleSort(event.target.value)}
                        className="select shadow-none h-8 focus:outline-none ml-1 mt-0.5 border-0 bg-stone-300 dark:bg-stone-600 cursor-pointer">
                        <option value='relative' className='dark:bg-stone-600'>關聯性</option>
                        <option value='newToOld' className='dark:bg-stone-600'>由新到舊</option>
                        <option value='oldToNew' className='dark:bg-stone-600'>由舊到新</option>
                        <option value='highToLow' className=' dark:bg-stone-600'>由價格低到高</option>
                        <option value='lowToHigh' className=' dark:bg-stone-600'>由價格高到低</option>
                    </select>
                </div>
            </form>

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