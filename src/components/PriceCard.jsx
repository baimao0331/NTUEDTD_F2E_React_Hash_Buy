export default function PriceCard(props) {
    const { item, isDiscount, selectedVariantId } = props;
    return (
        <div className=" w-4/10  p-4 bg-stone-50 shadow-lg rounded-md flex flex-col justify-between">

            {/* 折扣資訊 */}
            <div>
                <div className=" flex justify-between items-center text-nowrap md:text-xs lg:text-base">
                    {isDiscount ? <p>這個商品暫時沒有特價...</p> : <p className=" text-orange-700 font-bold">特價至${item.discount_end.replaceAll("-", "/")}</p>}
                    {isDiscount ?
                        <></> :
                        <span className=" text-stone-50 bg-orange-700 px-2 rounded-sm h-[1.5rem] mt-0.5 font-normal">
                            {`${100 - item.discount * 100}% off`}
                        </span>}
                </div>
                <hr className="my-2 w-full" />
            </div>

            {/* 價格資訊 */}
            <div className=" w-full">
                <div className="w-full grid grid-cols-2 text-lg md:text-right">
                    <p className=" text-nowrap">原始價格</p>
                    <p>{item.variants[selectedVariantId].price} {item.currency}</p>
                    <p className=" grid-cols-subgrid text-right text-sm text-stone-600">{item.variants[selectedVariantId].price}{item.currency}</p>
                </div>

                <div className="w-full grid grid-cols-2 text-lg md:text-right">
                    <p className=" text-nowrap ">當前價格</p>
                    <div className=" flex items-baseline self-end">
                        <p className=" text-2xl font-bold price">{Math.round(item.variants[selectedVariantId].price * item.discount)}</p>
                        <p className="ml-1">{item.currency}</p>
                        
                    </div>
                    <p className=" text-right text-sm text-stone-600">{Math.round(item.variants[selectedVariantId].price * item.discount)}{item.currency}</p>
                </div>
                
            </div>
        </div>
    )
}