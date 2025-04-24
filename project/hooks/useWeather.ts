import { useState, useEffect } from 'react';
import { WeatherData } from '@/types';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Coordinates for New Delhi, India
  const DELHI_COORDINATES = {
    latitude: 28.6139,
    longitude: 77.2090
  };

  const fetchWeather = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${DELHI_COORDINATES.latitude}&longitude=${DELHI_COORDINATES.longitude}&hourly=temperature_2m&timezone=Asia/Kolkata`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      
      // Extract current temperature (first hour in the hourly data)
      const currentTemp = data.hourly.temperature_2m[0];
      
      // Create a simplified weather object
      const weatherData: WeatherData = {
        temperature: currentTemp,
        condition: getConditionFromTemp(currentTemp),
        location: 'New Delhi',
      };
      
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to determine weather condition based on temperature
  const getConditionFromTemp = (temp: number): string => {
    if (temp < 20) return 'cool';
    if (temp < 25) return 'moderate';
    if (temp < 32) return 'warm';
    return 'hot';
  };

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeather();
    
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { weather, isLoading, error, fetchWeather };
}