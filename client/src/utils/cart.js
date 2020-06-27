import CountryByAbriviation from 'country-json/src/country-by-abbreviation.json';

export const computeTotal = products => {
  let totalForPaymentCalculation = 0;
  products.map(product => {
    totalForPaymentCalculation += product.price * product.quantity;
    return true;
  });
  return Math.round(totalForPaymentCalculation * 100) / 100;
};

export const countryAbbrToName = abbr =>
  CountryByAbriviation.find(country => country.abbreviation === abbr).country;

export const countryNameToAbbr = countryName =>
  CountryByAbriviation.find(country => country.country === countryName).abbabbreviation;
