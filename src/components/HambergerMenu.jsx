import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DarkModeBtn from './DarkModeBtn';
import CurrencySelect from './CurrencySelect';

export default function HambergerMenu() {
  const [hambergerMenu, setHamberger] = useState(false);

  const toggleHamberger = () => {
    setHamberger(!hambergerMenu);
  };

  return (
    <div className='hamberger'>
      {/* 漢堡按鈕 */}
      <label onClick={toggleHamberger}>
        <Menu size='40' className='md:hidden cursor-pointer text-orange-900' />
      </label>

      {/* 動畫區塊 */}
      <AnimatePresence>
        {hambergerMenu && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-screen h-screen bg-stone-300/80 dark:bg-stone-700/80 backdrop-blur-md z-50"
          >
            {/* 關閉按鈕 */}
            <X
              size='40'
              onClick={toggleHamberger}
              className='absolute right-10 top-3 cursor-pointer'
            />

            {/* 選單內容 */}
            <ul className=' flex flex-col gap-8 h-full items-center mt-[20vh]'>
              <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                <Link to={`/`}>
                  <div className='w-[50vw] p-2 rounded-md text-center border-2'>首頁</div>
                </Link>
              </li>
              <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                <Link to={`/products/category/3D模型`}>
                  <div className='w-[50vw] p-2 rounded-md text-center border-2'>3D模型</div>
                </Link>
              </li>
              <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                <Link to={`/products/category/周邊商品`}>
                  <div className='w-[50vw] p-2 rounded-md text-center border-2'>周邊商品</div>
                </Link>
              </li>
              <li className='hover:text-stone-600 dark:hover:text-orange-300'>
                <Link to={`/`}>
                  <div className='w-[50vw] p-2 rounded-md text-center border-2'>購物說明</div>
                </Link>
              </li>
              <li className='flex justify-between w-[50vw] px-2 mt-2'>
                <CurrencySelect />
                <DarkModeBtn />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
