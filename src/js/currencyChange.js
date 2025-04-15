import { useSelector } from "react-redux";
import { selectCurrency } from "../redux/currencySlice";

export default function currencyChange(currency, price) {
    const targetCurrency = useSelector(selectCurrency);
    switch (currency) {
        case "TWD":
            if(targetCurrency == "TWD"){
                return(price)
            }
            if (targetCurrency == "JPY") {
                return (Math.round(price * 4.4));
            }
            if (targetCurrency == "USD") {
                return (price * 0.031);
            }

        case "JPY":
            if(targetCurrency == "JPY"){
                return(price)
            }
            if (targetCurrency == "TWD") {
                return (Math.round(price * 0.23));
            }
            if (targetCurrency == "USD") {
                return (price * 0.007);
            }
        case "USD":
            if(targetCurrency == "USD"){
                return(price)
            }
            if (targetCurrency == "TWD") {
                return (price * 32.4);
            }
            if (targetCurrency == "JPY") {
                return (price * 143.01);
            }
    }
}