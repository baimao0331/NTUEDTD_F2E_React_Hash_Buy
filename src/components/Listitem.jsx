import { Link } from 'react-router'
import currencyChange from '../js/currencyChange'
import { useSelector } from "react-redux";
import { selectCurrency } from "../redux/currencySlice";
import { flip, shift, useFloating,useHover, autoUpdate, useInteractions, safePolygon} from '@floating-ui/react';
import { useState } from 'react';

export default function Listitem(props) {
    const { id, title, image, price, discount, currency } = props;
    const targetCurrency = useSelector(selectCurrency);
    const [isOpen, setIsOpen] = useState(false);
    const {refs, floatingStyles, context} = useFloating({
        whileElementsMounted: autoUpdate,
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'right-start',
        middleware:[flip({crossAxis:false,}),shift({crossAxis:false,})]
    });
    const hover = useHover(context, {
        handleClose: safePolygon(),
    });
    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover,
    ]);

    return (
        <>
            
            <div key={id} ref={refs.setReference} className="  h-25 w-full flex pl-4 pr-6 relative group text-stone-900 dark:text-stone-50"{...getReferenceProps()}>
                <Link to={`/products/id/` + id} className=' w-full h-full flex'>
                    <figure className=" h-2/3 w-1/4 aspect-[2/1] overflow-hidden rounded-sm self-center">
                        <img src={`/images/` + id + `/` + image} alt="商品圖" className=" h-full w-full object-cover object-center" />
                    </figure>
                    <div className='self-start mt-4 w-2/3'>
                        <p className=" h-[3rem] self-center text- ml-3 line-clamp-2">{title}</p>
                        <figure className=" absolute bottom-2 right-4 flex gap-1 items-baseline">
                            <span className={`text-stone-50 px-2 bg-red-800  dark:bg-orange-400 text-sm ${discount==1? 'hidden':''}`}>{discount * 100 == 100 ? null : `-` + (100 - discount * 100) + `%`}</span>
                            <p className=" text-right min-w-12 price font-bold text-lg">{Math.round(currencyChange(currency,price)*discount)}</p>
                            <p className=' text-sm'>{targetCurrency}</p>
                        </figure>
                    </div>
                </Link>
            </div>
            {isOpen && (
                <div ref={refs.setFloating} style={floatingStyles} className="max-w-sm rounded overflow-hidden shadow-lg" {...getFloatingProps()}>
                    
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
            </div>
            )}
        </>
    )
}