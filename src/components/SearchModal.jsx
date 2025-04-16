import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef();

    const toggleModal = () => setIsOpen(!isOpen);

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
            <div onClick={toggleModal} className=' flex'>
                <label className="input bg-stone-50 hidden md:flex">
                    <input type="search" required placeholder="輸入關鍵字" className=' text-stone-900 font-bold' />
                </label>
                <Search size='40' className=" text-orange-900 ml-4" />
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
                            className="fixed top-1/5 left-1/2 z-50 w-[80vw] max-w-xl p-6 rounded-xl -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">搜尋商品</h2>
                                <div onClick={toggleModal}>
                                    <X size='40' className=" cursor-pointer" />
                                </div>
                            </div>

                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="輸入關鍵字..."
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ring-orange-500 dark:bg-stone-700 dark:text-white"
                            />

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
