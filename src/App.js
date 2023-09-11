import { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = process.env.API_Key;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Vienna&appid=${API_KEY}&units=metric`,
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    fetchWeatherData().catch((error) => {
      console.error('Error in fetchWeatherData:', error);
    });
  }, [API_KEY]);

  if (weatherData === null || !weatherData.main) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: 'skyblue',
        textAlign: 'center',
        marginLeft: 500,
        marginRight: 500,
        padding: 100,
      }}
    >
      <div>
        <h2>{weatherData.name}</h2>
        <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
        <p>Description: {weatherData.weather[0]?.description}</p>
      </div>
    </div>
  );
};

export default Weather;
