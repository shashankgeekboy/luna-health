import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/Card';
import { Cloud, CloudRain, Droplets, Sun, Thermometer } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { WeatherData } from '@/types';

interface WeatherInsightProps {
  weather: WeatherData | null;
  isLoading: boolean;
}

const WeatherInsight: React.FC<WeatherInsightProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <Card title="Weather & Symptoms" style={styles.card}>
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </Card>
    );
  }
  
  if (!weather) {
    return (
      <Card title="Weather & Symptoms" style={styles.card}>
        <Text style={styles.errorText}>Unable to load weather data</Text>
      </Card>
    );
  }
  
  // Define weather icon based on condition
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'cold':
        return <Thermometer size={24} color={Colors.blue} />;
      case 'cool':
        return <Cloud size={24} color={Colors.blue} />;
      case 'moderate':
        return <Sun size={24} color={Colors.yellow} />;
      case 'warm':
        return <Sun size={24} color={Colors.orange} />;
      case 'hot':
        return <Thermometer size={24} color={Colors.error} />;
      default:
        return <Cloud size={24} color={Colors.gray600} />;
    }
  };
  
  // Get symptom insight based on weather
  const getWeatherInsight = () => {
    switch (weather.condition) {
      case 'cold':
        return "Cold weather may increase cramps. Consider a heating pad and warm tea.";
      case 'cool':
        return "Cool weather is generally good for reducing period discomfort.";
      case 'moderate':
        return "Moderate temperatures are ideal for maintaining comfort during your cycle.";
      case 'warm':
        return "Warm weather may increase bloating. Stay hydrated to reduce symptoms.";
      case 'hot':
        return "Hot weather can worsen period symptoms. Drink extra water and avoid sun exposure.";
      default:
        return "Track your symptoms along with weather to see personal patterns.";
    }
  };
  
  return (
    <Card title="Weather & Symptoms" style={styles.card}>
      <View style={styles.weatherContainer}>
        <View style={styles.weatherHeader}>
          {getWeatherIcon()}
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>{weather.temperature}°C</Text>
            <Text style={styles.location}>{weather.location}</Text>
          </View>
        </View>
        
        <View style={styles.insightContainer}>
          <Text style={styles.insightText}>{getWeatherInsight()}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  loadingText: {
    color: Colors.gray600,
    fontSize: 14,
    textAlign: 'center',
    padding: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    textAlign: 'center',
    padding: 16,
  },
  weatherContainer: {
    paddingVertical: 8,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherInfo: {
    marginLeft: 12,
  },
  temperature: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
  },
  location: {
    fontSize: 14,
    color: Colors.gray600,
  },
  insightContainer: {
    backgroundColor: Colors.gray50,
    borderRadius: 8,
    padding: 12,
  },
  insightText: {
    fontSize: 14,
    color: Colors.gray700,
    lineHeight: 20,
  },
});

export default WeatherInsight;