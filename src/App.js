import { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Vienna&appid=${API_KEY}&units=metric`,
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.log('Error fetching weather data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().catch((error) => {
      console.error('Error in fetchData: ', error);
      setIsLoading(false);
    });
  }, [API_KEY]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: 'skyblue',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5%',
        flex: '1',
      }}
    >
      <div
        style={{
          justifyContent: 'center',
          flex: '1',
        }}
      >
        <h2>{weatherData.name}</h2>
      </div>
      <div
        style={{
          justifyContent: 'center',
          flex: '1',
        }}
      >
        <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
        <p>Description: {weatherData.weather[0].description}</p>
      </div>
    </div>
  );
};

export default Weather;
