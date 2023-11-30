import Weather from "./weather";

async function getWeatherData(city) {
  const weatherData = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=f676a3e6dc3340ab9a5155038232911&q=${city}`
  );
  const parsedData = await weatherData.json();
  console.log(parsedData);
  return parsedData;
}

getWeatherData("Niš")
  .then((parsedData) => {
    const niš = Weather(parsedData);
    console.log(niš);
  })
  .catch((er) => {
    console.log(er);
  });
