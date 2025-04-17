import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { selectSearchHistory, newHistory, clearHistory } from '../redux/searchSlice'

export default function SearchModal() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef();
    const searchHistory = useSelector(selectSearchHistory);

    const toggleModal = () => setIsOpen(!isOpen);
    const toggleClear = () => dispatch(clearHistory());

    const handleSearch = (e) => {
        e.preventDefault(); // 防止重新整理
        if (keyword.trim() !== '') {
            dispatch(newHistory(keyword));
            toggleModal();
            navigate(`/results/${encodeURIComponent(keyword.trim())}`); // 將字串轉換為網址能用的格式
        }
    };

    // ESC 關閉功能
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    // 自動 focus
    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
    }, [isOpen]);

    return (
        <>
            {/* 搜尋 icon */}
            <div onClick={toggleModal} className=' flex cursor-pointer items-center'>
                <label className="input bg-stone-50 hidden md:flex">
                    <input type="search" required placeholder="輸入關鍵字" className=' text-stone-900 font-bold' />
                </label>
                <Search className=" size-[3vw] max-w-[40px] min-h-[30px] min-w-[30px] text-orange-900 ml-4" />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* 背景遮罩 */}
                        <motion.div
                            className="fixed inset-0 bg-stone-300/80 dark:bg-stone-700/80 backdrop-blur-md z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* modal 主體 */}
                        <motion.div
                            className="fixed top-1/2 left-1/2 z-50 w-[80vw] max-w-xl p-6 rounded-xl -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {/* 標題列 */}
                            <div className="flex justify-between items-center mb-4 ">
                                <h2 className="text-xl font-semibold">搜尋商品</h2>
                                <div onClick={toggleModal}>
                                    <X size="40" className="cursor-pointer" />
                                </div>
                            </div>

                            {/* 搜尋欄 */}
                            <form onSubmit={handleSearch} className="flex">
                                <input
                                    ref={inputRef}
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    type="text"
                                    placeholder="輸入關鍵字..."
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-stone-600 dark:border-stone-300 ring-orange-500 dark:bg-stone-700 dark:text-white"
                                />
                                <button className="!px-5 !py-0 ml-4">
                                    <Search size="30" className="text-orange-900" />
                                </button>
                            </form>

                            {/* 搜尋歷史 */}
                            {searchHistory.length > 0 && (
                                <div className="mt-4 min-h-[50vh]">
                                    <h3 className="text-sm text-stone-500 dark:text-stone-300 mb-2">搜尋歷史</h3>
                                    <ul className="space-y-1">
                                        {searchHistory.map((keyword, index) => (
                                            <li key={index} onClick={toggleModal}>
                                                <Link
                                                    to={`/results/${keyword}`}
                                                    className="block px-3 py-1 rounded hover:bg-stone-100 dark:hover:bg-stone-600"
                                                >
                                                    {keyword}
                                                </Link>
                                            </li>
                                        ))}
                                        <li onClick={toggleClear} 
                                            className=" mt-10 border-1 text-center p-2 rounded-md border-stone-600 dark:border-stone-300 cursor-pointer dark:hover:border-stone-500 hover:border-stone-100">
                                            清除搜尋歷史
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </motion.div>

                    </>
                )}
            </AnimatePresence>
        </>
    );
}
