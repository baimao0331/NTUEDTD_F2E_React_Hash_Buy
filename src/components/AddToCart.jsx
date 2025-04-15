import { ShoppingCart } from 'lucide-react';
import { useDispatch } from "react-redux";
import { addCartItems } from "../redux/cartSlice";

export default function AddToCart(props) {
    const dispatch = useDispatch();

    const { item, selectedVariantId, qty, outOfStock } = props;
    const addToCart = () => {
        dispatch(addCartItems({
            id: item.id,
            title: item.title,
            variantID: item.variants[selectedVariantId].id,
            variantName: item.variants[selectedVariantId].name,
            image: item.variants[selectedVariantId].image || item.images[0],
            price: item.variants[selectedVariantId].price,
            stock: item.variants[selectedVariantId].stock,
            qty: qty
        }))
    }
    return (
        <button 
            className=" w-full rounded-md flex justify-center gap-4 disabled:!bg-stone-500"
            disabled={(outOfStock ? true : false)}
            onClick={addToCart}>
            <ShoppingCart />加入購物車
        </button>
    )
}