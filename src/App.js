import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const cities = ['Vienna', 'London', 'Berlin', 'Tokyo'];
const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (cityName) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData((prevData) => ({ ...prevData, [cityName]: data }));
        } else {
          console.log(
            `Error fetching weather data for ${cityName}:`,
            response.status,
          );
        }
      } catch (error) {
        console.error(`Error fetching weather data for ${cityName}:`, error);
      }
    };

    const fetchDataForAllCities = async () => {
      setIsLoading(true);
      for (const city of cities) {
        await fetchData(city);
      }
      setIsLoading(false);
    };

    fetchDataForAllCities();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.body}>
      {cities.map((cityName) => (
        <div key={cityName} className={styles.weather}>
          <h2>{cityName}</h2>
          <p>Temperature: {Math.round(weatherData[cityName]?.main?.temp)}°C</p>
          <p>Description: {weatherData[cityName]?.weather?.[0]?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Weather;
