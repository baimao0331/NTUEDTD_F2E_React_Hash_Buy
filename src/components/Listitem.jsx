import { Link } from 'react-router'

export default function Listitem(props) {
    const { id, title, image, price, discount } = props;
    return (
        <li key={id} className=" listitem h-25 w-full flex pl-4 pr-6 relative mb-4 rounded-lg shadow-md group">
            <Link to={`/products/id/` + id} className=' w-full h-full flex'>
                <figure className=" h-2/3 aspect-2/1 overflow-hidden rounded-xl self-center">
                    <img src={`/images/` + id + `/` + image} alt="商品圖" className=" h-full w-full object-cover object-center" />
                </figure>
                <p className=" h-2/3 self-center ml-3">{title}</p>
                <figure className=" absolute bottom-2 right-4 flex gap-1 items-baseline">
                    <span className="text-red-800 text-sm">{discount * 100 == 100 ? null : `-` + (100 - discount * 100) + `%`}</span>
                    <p className=" text-right min-w-12 price font-bold text-xl">{price}</p>
                    <p>TWD</p>
                </figure>
            </Link>
        </li>
    )
}