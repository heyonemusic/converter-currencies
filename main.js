const currencies = {}; // Объектная константа с курсами 3-ёх валют

// Элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// Элементы для отображения выгоды
const profitUSD = document.querySelector('[data-profit="USD"]');
const profitEUR = document.querySelector('[data-profit="EUR"]');
const profitGBP = document.querySelector('[data-profit="GBP"]');

// Элементы для конвертации
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const select = document.querySelector("#select");

// Получение данных по API, формирование, работа с результатом запроса
async function getCurrencies() {
  // Запрос к данным с котировками валют
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  // Формирование объекта с полученными данными
  const data = await response.json();

  // Наполнение объектной константы определёнными валютами со значением
  currencies.USD = data.Valute.USD.Value;
  currencies.EUR = data.Valute.EUR.Value;
  currencies.GBP = data.Valute.GBP.Value;

  // Подставление информации в HTML-блоки
  elementUSD.textContent = currencies.USD.toFixed(2);
  elementEUR.textContent = currencies.EUR.toFixed(2);
  elementGBP.textContent = currencies.GBP.toFixed(2);

  // Показ выгоды USD
  if (data.Valute.USD.Value > data.Valute.USD.Previous) {
    let positiveProfit = data.Valute.USD.Value - data.Valute.USD.Previous;
    profitUSD.classList.add("green");
    profitUSD.classList.remove("red");
    profitUSD.textContent = "+ " + positiveProfit.toFixed(1) + " RUB";
  } else {
    let negativeProfit = data.Valute.USD.Previous - data.Valute.USD.Value;
    profitUSD.classList.remove("green");
    profitUSD.classList.add("red");
    profitUSD.textContent = "- " + negativeProfit.toFixed(1) + " RUB";
  }

  // Показ выгоды EUR
  if (data.Valute.EUR.Value > data.Valute.EUR.Previous) {
    let positiveProfit = data.Valute.GBP.Value - data.Valute.GBP.Previous;
    profitEUR.classList.add("green");
    profitEUR.classList.remove("red");
    profitEUR.textContent = "+ " + positiveProfit.toFixed(1) + " RUB";
  } else {
    let negativeProfit = data.Valute.GBP.Previous - data.Valute.GBP.Value;
    profitEUR.classList.remove("green");
    profitEUR.classList.add("red");
    profitEUR.textContent = "- " + negativeProfit.toFixed(1) + " RUB";
  }

  // Показ выгоды GBP
  if (data.Valute.GBP.Value > data.Valute.GBP.Previous) {
    let positiveProfit = data.Valute.GBP.Value - data.Valute.GBP.Previous;
    profitGBP.classList.add("green");
    profitGBP.classList.remove("red");
    profitGBP.textContent = "+ " + positiveProfit.toFixed(1) + " RUB";
  } else {
    let negativeProfit = data.Valute.AMD.Previous - data.Valute.AMD.Value;
    profitGBP.classList.remove("green");
    profitGBP.classList.add("red");
    profitGBP.textContent = "- " + negativeProfit.toFixed(1) + " RUB";
  }

  console.log(data)
}

// Конвертация
function conversion() {
  // Прослушивание события ввода
  input.oninput = function () {
    output.value = (parseFloat(input.value) / currencies[select.value]).toFixed(
      2
    );
  };
  // Прослушивание события выбора
  select.oninput = function () {
    output.value = (parseFloat(input.value) / currencies[select.value]).toFixed(
      2
    );
  };
}

getCurrencies();
conversion();
