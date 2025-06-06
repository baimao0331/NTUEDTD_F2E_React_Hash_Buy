export default function OrderStatusStepper({ status }) {
    const statusSteps = ["pending", "processing", "shipped", "delivered"];
    const statusLabels = {
        pending: "訂單成立",
        processing: "揀貨中",
        shipped: "配送中",
        delivered: "已送達"
    };

    const currentIndex = statusSteps.indexOf(status);

    return (
        <div className="my-4 px-2 grid grid-cols-4">
            {statusSteps.map((step, index) => (
                <div key={step} className="">
                    <div className=" flex flex-col justify-center">
                        <div className=" flex items-center">
                            <div className={` w-1/2 h-2 ${index-1 < currentIndex ? 'bg-orange-300' : 'bg-gray-300'} ${index == 0 ? 'rounded-l-full' : ''}`} />
                            <div className={` w-1/2 h-2 ${index <= currentIndex ? 'bg-orange-300' : 'bg-gray-300'} ${index == 3 ? 'rounded-r-full' : ''}` } />
                        </div>
                        <p className={`text-xs mt-1 text-center whitespace-nowrap ${index-1 < currentIndex ? 'text-orange-300 font-bold' : ''}`}>
                            {statusLabels[step]}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
