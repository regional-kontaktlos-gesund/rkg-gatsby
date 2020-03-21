export const formatPrice = ({ centAmount, currencyCode, fractionDigits }) => {
    const euroAmount = centAmount/100
    const options = {
        style: "currency",
        currency: currencyCode ? currencyCode : 'EUR',
        currencyDisplay: "symbol", 
        minimumFractionDigits: fractionDigits ? fractionDigits : 2,
        maximumFractionDigits: fractionDigits ? fractionDigits : 2
    }
    return euroAmount.toLocaleString("de-DE", options);
  }