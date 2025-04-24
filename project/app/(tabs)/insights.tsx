import React from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native';
import { addDays, format, parseISO, differenceInDays } from 'date-fns';
import { useCycle } from '@/hooks/useCycle';
import { useWeather } from '@/hooks/useWeather';
import { Colors } from '@/constants/Colors';
import CycleInsightsCard from '@/components/Insights/CycleInsightsCard';
import WeatherInsight from '@/components/Insights/WeatherInsight';
import { LineChart } from 'react-native-chart-kit';
import Card from '@/components/ui/Card';

export default function InsightsScreen() {
  const { cycles, nextPeriodDate, ovulationDate } = useCycle();
  const { weather, isLoading: weatherLoading } = useWeather();
  
  // Calculate current cycle day
  const getCurrentCycleDay = () => {
    if (!cycles || cycles.length === 0) return null;
    
    const lastCompletedCycle = [...cycles]
      .filter(cycle => cycle.endDate)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0];
    
    if (!lastCompletedCycle) return null;
    
    const today = new Date();
    const lastPeriodStart = parseISO(lastCompletedCycle.startDate);
    
    return differenceInDays(today, lastPeriodStart) + 1;
  };
  
  // Calculate average cycle length
  const getAverageCycleLength = () => {
    if (!cycles || cycles.length < 2) return null;
    
    const completedCycles = cycles.filter(cycle => cycle.endDate);
    
    if (completedCycles.length < 2) return null;
    
    const totalDays = completedCycles.reduce((sum, cycle) => {
      if (!cycle.length) return sum;
      return sum + cycle.length;
    }, 0);
    
    return Math.round(totalDays / completedCycles.length);
  };
  
  const currentCycleDay = getCurrentCycleDay();
  const avgCycleLength = getAverageCycleLength();
  
  // Generate cycle length data for chart
  const getCycleLengthData = () => {
    if (!cycles || cycles.length < 2) return { labels: [], datasets: [{ data: [] }] };
    
    const completedCycles = cycles
      .filter(cycle => cycle.endDate && cycle.length)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(-6);
    
    return {
      labels: completedCycles.map((_, index) => `C${index + 1}`),
      datasets: [
        {
          data: completedCycles.map(cycle => cycle.length || 28),
          color: () => Colors.primary,
          strokeWidth: 2,
        },
      ],
    };
  };
  
  // Generate period length data for chart
  const getPeriodLengthData = () => {
    if (!cycles || cycles.length < 2) return { labels: [], datasets: [{ data: [] }] };
    
    const completedCycles = cycles
      .filter(cycle => cycle.endDate && cycle.periodLength)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(-6);
    
    return {
      labels: completedCycles.map((_, index) => `C${index + 1}`),
      datasets: [
        {
          data: completedCycles.map(cycle => cycle.periodLength || 5),
          color: () => Colors.secondary,
          strokeWidth: 2,
        },
      ],
    };
  };
  
  const cycleLengthData = getCycleLengthData();
  const periodLengthData = getPeriodLengthData();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
        </View>
        
        <View style={styles.content}>
          {/* Cycle Insights Card */}
          <CycleInsightsCard
            nextPeriodDate={nextPeriodDate}
            ovulationDate={ovulationDate}
            cycleDays={avgCycleLength}
            currentDay={currentCycleDay}
          />
          
          {/* Weather Card */}
          <WeatherInsight weather={weather} isLoading={weatherLoading} />
          
          {/* Cycle Length Chart */}
          {cycleLengthData.labels.length > 0 && (
            <Card title="Cycle Length" style={styles.chartCard}>
              <Text style={styles.chartSubtitle}>Your past {cycleLengthData.labels.length} cycles</Text>
              <LineChart
                data={cycleLengthData}
                width={320}
                height={180}
                chartConfig={{
                  backgroundColor: 'white',
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  decimalPlaces: 0,
                  color: () => Colors.primary,
                  labelColor: () => Colors.gray600,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: Colors.primaryDark,
                  },
                }}
                bezier
                style={styles.chart}
              />
            </Card>
          )}
          
          {/* Period Length Chart */}
          {periodLengthData.labels.length > 0 && (
            <Card title="Period Length" style={styles.chartCard}>
              <Text style={styles.chartSubtitle}>Days of bleeding per cycle</Text>
              <LineChart
                data={periodLengthData}
                width={320}
                height={180}
                chartConfig={{
                  backgroundColor: 'white',
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  decimalPlaces: 0,
                  color: () => Colors.secondary,
                  labelColor: () => Colors.gray600,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: Colors.secondaryDark,
                  },
                }}
                bezier
                style={styles.chart}
              />
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.gray800,
    fontFamily: 'Poppins-Bold',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  chartCard: {
    marginBottom: 16,
  },
  chartSubtitle: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  chart: {
    borderRadius: 16,
    marginHorizontal: -16,
  },
});