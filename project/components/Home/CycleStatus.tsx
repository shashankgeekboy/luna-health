import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { differenceInDays, format, parseISO } from 'date-fns';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import Button from '@/components/ui/Button';

interface CycleStatusProps {
  currentCycle: any | null;
  nextPeriodDate: string | null;
  onLogPeriod: () => void;
}

const CycleStatus: React.FC<CycleStatusProps> = ({
  currentCycle,
  nextPeriodDate,
  onLogPeriod,
}) => {
  const today = new Date();
  
  // Check if user is on period
  const isOnPeriod = () => {
    if (!currentCycle) return false;
    
    // If there's no end date, check the most recent log
    if (!currentCycle.endDate) {
      if (currentCycle.days.length === 0) return false;
      
      // Check if there's a log for today or yesterday
      return currentCycle.days.some(day => {
        const dayDate = parseISO(day.date);
        const diffDays = differenceInDays(today, dayDate);
        return diffDays <= 1 && day.flow;
      });
    }
    
    return false;
  };
  
  // Calculate days until next period
  const getDaysUntilNextPeriod = () => {
    if (!nextPeriodDate) return null;
    
    const next = parseISO(nextPeriodDate);
    const diffInTime = next.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    
    return diffInDays;
  };
  
  const daysUntilPeriod = getDaysUntilNextPeriod();
  const onPeriod = isOnPeriod();
  
  let statusMessage = '';
  let statusColor = Colors.primary;
  
  if (onPeriod) {
    statusMessage = 'You are on your period';
    statusColor = Colors.primary;
  } else if (daysUntilPeriod !== null) {
    if (daysUntilPeriod <= 0) {
      statusMessage = 'Your period is due today';
      statusColor = Colors.primary;
    } else if (daysUntilPeriod === 1) {
      statusMessage = 'Your period is due tomorrow';
      statusColor = Colors.primary;
    } else if (daysUntilPeriod <= 3) {
      statusMessage = `Your period is coming in ${daysUntilPeriod} days`;
      statusColor = Colors.primary;
    } else {
      statusMessage = `${daysUntilPeriod} days until your next period`;
      statusColor = Colors.secondary;
    }
  } else {
    statusMessage = 'Track your period to get predictions';
    statusColor = Colors.gray600;
  }
  
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
        <Text style={styles.statusText}>{statusMessage}</Text>
      </View>
      
      {nextPeriodDate && (
        <Text style={styles.dateText}>
          Expected on {format(parseISO(nextPeriodDate), 'MMMM d, yyyy')}
        </Text>
      )}
      
      <View style={styles.buttonContainer}>
        <Button
          title={onPeriod ? "Update Period" : "Log Period"}
          onPress={onLogPeriod}
          variant={onPeriod ? "secondary" : "primary"}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: -50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
  },
  dateText: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
});

export default CycleStatus;