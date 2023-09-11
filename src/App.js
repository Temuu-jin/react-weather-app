import { useEffect, useState } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
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
        setIsLoading(false); // Set isLoading to false whether data is fetched successfully or not
      }
    };

    fetchData().catch((error) => {
      console.error('Error in fetchData: ', error);
      setIsLoading(false); // Set isLoading to false in case of an error
    });
  }, [API_KEY]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the content when weatherData is available
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
        <p>Temperature: {Math.round(weatherData.main?.temp)}°C</p>
        <p>Description: {weatherData.weather?.[0]?.description}</p>
      </div>
    </div>
  );
};

export default Weather;
