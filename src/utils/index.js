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


export async function fetchData(enpoint){
    fetch('https://rkg-api-602.herokuapp.com/api/'+enpoint)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }