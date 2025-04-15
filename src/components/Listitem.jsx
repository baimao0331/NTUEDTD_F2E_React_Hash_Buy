import { Link } from 'react-router'

export default function Listitem(props) {
    const { id, title, image, price, discount } = props;
    return (
        <>
            <hr className=' border-1 border-stone-200' />
            <li key={id} className="  h-25 w-full flex pl-4 pr-6 relative group">
                <Link to={`/products/id/` + id} className=' w-full h-full flex'>
                    <figure className=" h-2/3 w-1/4 aspect-[2/1] overflow-hidden rounded-sm self-center">
                        <img src={`/images/` + id + `/` + image} alt="商品圖" className=" h-full w-full object-cover object-center" />
                    </figure>
                    <div className='self-start mt-4 w-2/3'>
                        <p className=" h-[3rem] self-center text-sm ml-3 line-clamp-2">{title}</p>
                        <figure className=" absolute bottom-2 right-4 flex gap-1 items-baseline">
                            <span className={`text-stone-50 px-2 bg-red-800 rounded-xs dark:text-orange-400 text-sm ${discount==1? 'hidden':''}`}>{discount * 100 == 100 ? null : `-` + (100 - discount * 100) + `%`}</span>
                            <p className=" text-right min-w-12 price font-bold text-lg">{price}</p>
                            <p className=' text-sm'>TWD</p>
                        </figure>
                    </div>
                </Link>
            </li>
        </>
    )
}