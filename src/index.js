import Weather, { HourlyWeather } from "./weather";

const cityBtn = document.getElementById("city-btn");
const cityInput = document.getElementById("city");
const cwTemp = document.querySelector(".cw-temp");
const cwCity = document.getElementById("cw-city");
const cwHum = document.getElementById("cw-hum");
const cwWind = document.getElementById("cw-wind");
const cwPress = document.getElementById("cw-press");
const cwIcon = document.getElementById("cw-icon");

const hwContainer = document.querySelector(".hw-container");

const symbol = "˚C";

async function getWeatherData(city) {
  const weatherData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f676a3e6dc3340ab9a5155038232911&q=${city}&days=2`
  );
  const parsedData = await weatherData.json();
  console.log(parsedData);
  return parsedData;
}

async function displayCurrentWeather(city) {
  const newWeatherData = await getWeatherData(city);
  const currentWeather = Weather(newWeatherData);
  cwIcon.src = currentWeather.icon;
  cwTemp.innerHTML = currentWeather.tempC + symbol;
  cwCity.innerHTML = currentWeather.city;
  cwHum.innerHTML = currentWeather.humidity;
  cwWind.innerHTML = currentWeather.wind;
  cwPress.innerHTML = currentWeather.pressure;
}

function makeHourDisplay(array) {
  const hwContent = document.createElement("div");
  hwContent.classList.add("hw-content");

  const hour = document.createElement("div");
  hour.innerHTML = array[0];
  hwContent.appendChild(hour);

  const pic = document.createElement("img");
  pic.src = array[2];
  hwContent.appendChild(pic);

  const temp = document.createElement("div");
  temp.innerHTML = array[1] + symbol;
  hwContent.appendChild(temp);

  hwContainer.appendChild(hwContent);
}

async function displayHourlyWeather(city) {
  const newWeatherData = await getWeatherData(city);
  const hourlyWeather = await HourlyWeather(newWeatherData);
  hwContainer.innerHTML = "";
  Object.keys(hourlyWeather).forEach((key) => {
    makeHourDisplay(hourlyWeather[key]);
  });
}

cityBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (cityInput) {
    displayCurrentWeather(cityInput.value);
    displayHourlyWeather(cityInput.value);
  }
});
window.addEventListener("load", () => {
  displayCurrentWeather("London");
  displayHourlyWeather("London");
});
