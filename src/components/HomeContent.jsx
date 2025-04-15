import { Link } from 'react-router'
import Announcement from "../components/Announcement"
import items from "../json/items.json"
import Listitem from './Listitem'

export default function HomeContent() {
    return (
        <>
            <main className=' main w-dvw px-10 '>
                <Announcement/>
                <div className='max-w-screen-xl mx-auto my-4 flex flex-col md:flex-row justify-between md:px-15'>
                    <ul className=' flex flex-col md:w-48/100'>
                        <p className=' text-xl font-bold title mb-2'>熱門商品</p>
                        {items.map(item => (
                            <Listitem
                            key = {item.id}
                            id = {item.id}
                            image = {item.images[0] || item.variants[0].image}
                            title = {item.title}
                            discount = {item.discount}
                            price = {item.variants[0].price}
                            />
                        ))}
                    </ul>
                    <ul className=' flex flex-col md:w-48/100'>
                        <p className=' text-xl font-bold title mb-2'>新上架</p>
                        {items.map(item => (
                            <Listitem
                            key = {item.id}
                            id = {item.id}
                            image = {item.images[0]}
                            title = {item.title}
                            discount = {item.discount}
                            price = {item.variants[0].price}
                            />
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}