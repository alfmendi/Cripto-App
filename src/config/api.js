export const listaMonedas = (divisa) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${divisa}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const conseguirMoneda = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const historicoMoneda = (id, dias = 365, divisa) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${divisa}&days=${dias}`;

export const monedasTrending = (divisa) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${divisa}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
