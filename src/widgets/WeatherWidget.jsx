import React, { useEffect, useState } from 'react';
import { fetchWithRetry } from '../core/api.js';

/**
 * Displays current weather for a city using OpenWeatherMap.
 */
export default function WeatherWidget({ city = 'London' }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function load() {
      const apiKey = process.env.WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`;
      try {
        const data = await fetchWithRetry(url, {}, {
          cacheKey: `weather:${city}`,
          ttl: 10 * 60 * 1000, // 10 minutes
        });
        setWeather({
          temp: data.main?.temp,
          description: data.weather?.[0]?.description,
        });
      } catch (err) {
        console.error('Weather fetch failed', err);
      }
    }
    load();
  }, [city]);

  if (!weather) return null;
  return (
    <div className="widget weather-widget">
      {weather.temp}°C - {weather.description}
    </div>
  );
}
