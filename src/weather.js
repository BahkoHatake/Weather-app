export default function Weather(parsedData) {
  const city = parsedData.location.name;
  const { country } = parsedData.location;
  const tempC = parsedData.current.temp_c;
  const tempF = parsedData.current.temp_f;

  return {
    city,
    country,
    tempC,
    tempF,
  };
}
