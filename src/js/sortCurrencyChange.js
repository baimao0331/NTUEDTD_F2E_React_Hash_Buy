var exchange = {
    'JPY':{
        'USD':0.007,
        'JPY':1,
        'TWD':0.23
    },
    'USD':{
        'USD':1,
        'JPY':143.01,
        'TWD':32.4
    }
}

export default function sortCurrencyChange(currency, targetCurrency, price) {
    var result = 0;
    try {
        if (currency == targetCurrency) {
            result = price;
        } else {
            result = Math.round(price * exchange[currency][targetCurrency]);
        }
    } catch (error) {
        result = Math.round(price * (1/exchange[targetCurrency][currency]));
    }
    return(result);
    /*switch (currency) {
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
    }*/
}