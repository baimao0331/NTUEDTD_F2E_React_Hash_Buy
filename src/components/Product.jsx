import items from "../json/items.json";
import { Link } from 'react-router'
import { Helmet } from "react-helmet-async"
import { useParams } from 'react-router';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, Heart } from 'lucide-react';
import { findBestMatch } from "string-similarity";
import Listitem from './Listitem'
import PriceCard from "./PriceCard";
import AddToCart from "./AddToCart";

export default function Product() {
    const param = useParams();
    const now = new Date();
    const item = items.find((x) => x.id === parseInt(param.id));
    const [selectedVariantId, setSelectedVariantId] = useState(0);
    const [displayImage, setDisplayImage] = useState(0);
    const [likesNum, setLikesNum] = useState(item.likes);
    const outOfStock = (item.variants[selectedVariantId].stock <= 0);
    //const isDiscountValid = item.discount_end && new Date(item.discount_end) > new Date();
    //const displayPrice = isDiscountValid ? Math.round(item.price * item.discount) : item.price;
    const isDiscount = (item.discount !== 1) ? true : false;
    const [qty, setQty] = useState(item.variants[selectedVariantId].stock > 0 ? 1 : 0)
    const [liked, setLiked] = useState(false);

    //圖片
    const imgs = []
    let commonImg = 0;
    item.images.forEach(img => {
        if (img) {
            imgs.push(img);
            commonImg++;
        };
    });
    item.variants.forEach(variant => {
        if (variant.image) imgs.push(variant.image);
    });
    const thumbnailRefs = useRef([]);
    //圖片滾動
    useEffect(() => {
        const selectedEl = thumbnailRefs.current[displayImage];
        if (selectedEl) {
            selectedEl.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [displayImage]);

    //隨品項更新頁面
    const changeVariantId = (event) => {
        const newIndex = Number(event.target.value);
        setSelectedVariantId(newIndex);
        setDisplayImage(imgs.length == commonImg ? (displayImage) : (commonImg + newIndex));
    }

    //購買數量增減
    const handleDecrease = () => {
        setQty(prev => Math.max(1, prev - 1));
    };
    const handleIncrease = () => {
        setQty(prev => Math.min(item.variants[selectedVariantId].stock, prev + 1));
    };

    //關聯商品
    const titles = items.map(x => x.title);
    const result = findBestMatch(item.title, titles);
    const ratedItems = items.map((item, index) => ({
        ...item,
        similarity: result.ratings[index].rating
    }));
    const similarItems = ratedItems
        .filter(x => x.id !== item.id && x.similarity > 0)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3);

    //喜歡數
    const changeliked = () => {
        if (likesNum == item.likes) {
            setLikesNum(prev => prev + 1);
            setLiked(true);
        } else {
            setLikesNum(prev => prev - 1);
            setLiked(false);
        }
    }

    return (
        <main className=" main w-screen overflow-hidden">
            <Helmet>
                <title>{item.title} - Hash·Buy</title>
            </Helmet>
            <div className="max-w-screen-xl mx-auto px-10">
                <div className="breadcrumbs text-sm mb-4">
                    <ul>
                        <li><Link to={`/`}>首頁</Link></li>
                        <li><Link to={`/products/category/${encodeURIComponent(item.itemType.trim())}`} >{item.itemType}</Link></li>
                        <li>{item.title}</li>
                    </ul>
                </div>

                <div className=" flex flex-col md:flex-row">
                    {/* 圖片區域 */}
                    <div className="relative flex flex-col w-full md:w-2/5 ">
                        <figure className="aspect-square overflow-hidden rounded-xl border border-stone-500 bg-stone-500/50">
                            <img
                                src={`/images/${item.id}/${imgs[displayImage]}`}
                                alt=""
                                className="w-full h-full object-contain object-center"
                            />
                        </figure>
                        <div className=" relative flex items-center gap-2 w-full mt-4">
                            <button className="btn !py-2 !px-0 h-full !bg-stone-300 dark:!bg-stone-600 dark:!text-stone-50 !shadow-none"
                                onClick={() => setDisplayImage(prev => (prev - 1 + imgs.length) % imgs.length)}>
                                <ChevronLeft />
                            </button>
                            <div className=" flex h-20 overflow-x-scroll no-scrollbar gap-2 bg-stone-50 dark:bg-stone-700 p-2 rounded-xl shadow-lg flex-1">
                                {imgs.map((image, i) => (
                                    <img
                                        key={i}
                                        ref={element => thumbnailRefs.current[i] = element}
                                        src={`/images/` + item.id + `/` + image}
                                        onClick={() => setDisplayImage(i)}
                                        className={` aspect-square bg-stone-300 dark:bg-stone-500 object-cover object-center rounded-lg cursor-pointer hover:border-2 hover:border-orange-300 ${displayImage === i ? 'border-2 border-stone-300' : 'border-0'}`} />
                                ))}
                            </div>
                            <button className="btn !py-2 !px-0 h-full !bg-stone-300 dark:!bg-stone-600 dark:!text-stone-50 !shadow-none"
                                onClick={() => setDisplayImage(prev => (prev + 1) % imgs.length)}>
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* 資訊與操作區 */}
                    <div className=" py-4 info-gird-area w-full md:w-3/5 md:pl-10">
                        {/* 標題文字 */}
                        <h2 className="info-title text-xl font-bold min-h-[3rem] leading-snug">{item.title}</h2>

                        <div className=" relative info-main flex justify-between">
                            <div className=" w-5/10 lg:w-6/10 mt-4">
                                <p className="font-bold">by {item.creator}</p>
                                <p className="text-sm text-stone-600 dark:text-stone-400">{item.release_date.replaceAll("-", "/")} 推出</p>

                                {/* 品項下拉選單 */}
                                <select
                                    defaultValue={item.variants[0].name}
                                    disabled={item.variants.length == 1 ? true : false}
                                    className={` absolute select w-1/3 lg:w-1/2 bottom-0 bg-stone-50 dark:bg-stone-700 `}
                                    onChange={changeVariantId}>
                                    {item.variants.map(variant => (
                                        <option key={variant.id} value={variant.id - 1}>
                                            {variant.name}{variant.stock == 0 ? "【缺貨】" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <PriceCard
                                item={item}
                                isDiscount={isDiscount}
                                selectedVariantId={selectedVariantId}
                                 />
                        </div>

                        {/* 數量&加入購物車 */}
                        <div className="info-bottom mt-4">
                            <div className={` flex justify-between mb-8 `}>
                                {/*數量選擇 */}
                                {item.itemType !== "3D模型" ? (
                                    <div className=" inline-flex w-1/4 rounded-sm">
                                        <button className={` btn !p-2 no-round !rounded-l-md !rounded-r-none !bg-stone-200 dark:!bg-stone-700 !shadow-none !px-0 w-1/4`}
                                            disabled={(outOfStock ? true : false)}
                                            onClick={handleDecrease}>
                                            <Minus className=" dark:!text-stone-50" />
                                        </button>
                                        <div className="flex items-center w-1/2 bg-stone-50 dark:bg-stone-600"><p className=" text-center w-full">{outOfStock ? 0 : qty}</p></div>
                                        <button className=" btn !p-2 no-round !rounded-r-sm !rounded-l-none !bg-stone-200 dark:!bg-stone-700 !shadow-none !px-0 w-1/4"
                                            disabled={(outOfStock ? true : false)}
                                            onClick={handleIncrease}>
                                            <Plus className=" dark:!text-stone-50" />
                                        </button>
                                    </div>) :
                                    (<div className=" inline-flex w-1/3 rounded-sm text-stone-600 border p-2 cursor-not-allowed"><p className=" w-full text-center">數位商品不提供複數購買</p></div>)}

                                <div className=" flex items-center gap-2">
                                    <p className=" text-lg text-right">{likesNum}</p>
                                    <label className="cursor-pointer swap swap-flip">
                                        <input type="checkbox" onChange={changeliked} />
                                        <Heart fill='none' className="size-8 text-orange-900 dark:text-orange-300 swap-off" />
                                        <Heart fill="currentColor" className="size-8 text-orange-900 dark:text-orange-300 swap-on" />
                                    </label>

                                </div>
                            </div>

                            {/*加入購物車 */}
                            <AddToCart
                                item={item}
                                selectedVariantId={selectedVariantId}
                                outOfStock={outOfStock}
                                qty={qty} />

                            <div className=" mt-15 bg-stone-300 w-full h-25 p-4">
                                <p className=" text-2xl text-center">歡迎廣告置入</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex flex-col md:flex-row gap-4">
                    <div className=" w-full md:w-2/3">
                        <h3 className="text-xl font-bold text-orange-900 dark:text-orange-300 mb-2">簡介</h3>
                        <div className="whitespace-pre-wrap overflow-y-auto">
                            <p>{item.description}</p>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col md:w-1/3">
                        <h3 className="text-xl font-bold text-orange-900 dark:text-orange-300 mb-2">關聯商品</h3>
                        <ul>
                            {similarItems.map(x => (
                                <Listitem
                                    key={x.id}
                                    id={x.id}
                                    image={x.images[0]}
                                    title={x.title}
                                    discount={x.discount}
                                    price={x.variants[0].price}
                                    currency={x.currency}
                                    description={x.description}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}