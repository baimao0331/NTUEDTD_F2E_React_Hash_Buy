import { useParams } from 'react-router';
import items from "../json/items.json";
import { findBestMatch } from "string-similarity";
import Listitem from './Listitem'
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { selectSearchHistory, newHistory, clearHistory } from '../redux/searchSlice'

export default function SearchResult() {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef();
    const param = useParams();
    const history = useSelector(selectSearchHistory);

    const handleSearch = (e) => {
        e.preventDefault(); // 防止重新整理
        if (keyword.trim() !== '') {
            dispatch(newHistory(keyword));
            navigate(`/results/${encodeURIComponent(keyword.trim())}`); // 將字串轉換為網址能用的格式
        }
    };

    const titles = items.map(x => x.title);
    const result = findBestMatch(param.keyword, titles);
    const ratedItems = items.map((item, index) => ({
        ...item,
        similarity: result.ratings[index].rating
    }));
    const similarItems = ratedItems
        .filter(x => x.similarity > 0)
        .sort((a, b) => b.similarity - a.similarity)

    console.log(similarItems);
    return (
        <div className='max-w-screen-xl mx-auto px-10 w-full'>
            <form onSubmit={handleSearch} className=' flex flex-col my-10  w-full gap-4'>
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

                <ul className=' flex items-center'>
                    <li className='text-stone-100'>搜尋歷史</li>
                    {history.map((keyword, index) => (
                        <li>
                            {<Link
                                to={`/results/${keyword}`}
                                className="block px-3 py-1 rounded hover:bg-stone-100 dark:hover:bg-stone-600"
                            >
                                {keyword}
                            </Link>}
                        </li>
                    ))}
                </ul>
            </form>


            <ul className=' grid grid-cols-2 gap-10'>
                {similarItems.map((item) => (
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