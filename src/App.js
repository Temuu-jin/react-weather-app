import { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
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
      }
    };

    fetchData().catch((error) => {
      console.error('Error in fetchData: ', error);
    });

    // Check weatherData every 500 milliseconds until it's fully available
    const checkDataInterval = setInterval(() => {
      if (weatherData.main) {
        clearInterval(checkDataInterval); // Stop the interval when data is available
      }
    }, 500);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(checkDataInterval);
    };
  }, [API_KEY, weatherData]); // Include weatherData in the dependency array to re-check when it changes

  // Render the content when weatherData is available
  if (!weatherData.main) {
    return <div>Loading...</div>;
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
        <p>Description: {weatherData.weather[0].description}</p>
      </div>
    </div>
  );
};

export default Weather;
