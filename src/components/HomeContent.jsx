import { Link } from 'react-router'
import Announcement from "../components/Announcement"
import items from "../json/items.json"
import Listitem from './Listitem'

export default function HomeContent() {
    return (
        <>
            <main className=' main w-dvw px-10 bg-stone-100 dark:bg-stone-800'>
                <Announcement/>
                <div className='max-w-screen-xl mx-auto my-4 gap-5 flex flex-col md:flex-row justify-between '>
                    <ul className=' flex flex-col md:w-50/100 bg-stone-50 dark:bg-stone-700 rounded-lg pt-3'>
                        <p className=' text-lg font-bold mb-3 pl-3 text-orange-900 dark:text-orange-300'>熱門商品</p>
                        {items.map(item => (
                            <Listitem
                            key = {item.id}
                            id = {item.id}
                            image = {item.images[0] || item.variants[0].image}
                            title = {item.title}
                            discount = {item.discount}
                            price = {item.variants[0].price}
                            currency = {item.currency}
                            />
                        ))}
                    </ul>
                    <ul className=' flex flex-col md:w-48/100 bg-stone-50 dark:bg-stone-700 rounded-lg pt-3'>
                        <p className=' text-lg font-bold mb-3 pl-3 text-orange-900 dark:text-orange-300'>新上架</p>
                        {items.map(item => (
                            <Listitem
                            key = {item.id}
                            id = {item.id}
                            image = {item.images[0]}
                            title = {item.title}
                            discount = {item.discount}
                            price = {item.variants[0].price}
                            currency = {item.currency}
                            />
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}