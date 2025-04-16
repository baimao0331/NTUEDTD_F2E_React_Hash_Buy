import { Megaphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Announcement() {
    const notices = [
        '服務試營運開始! 暫不開放會員系統',
        '慶祝開發者還有呼吸 全站免運直到開發者沒有呼吸',
        '提醒! 沒有收到商品是正常現象'
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % notices.length);
        }, 6000); // 換下一段的時間
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className=' max-w-screen-xl mx-auto overflow-hidden bg-orange-100 dark:bg-stone-800 border-1 text-stone-900 dark:text-stone-50 border-orange-900 dark:border-stone-600 rounded-md py-1 flex items-center gap-4'>
                <Megaphone size='30' className=' text-orange-900 dark:text-orange-300 ml-8' />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className=" w-full"
                    >
                        {notices[index]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}

