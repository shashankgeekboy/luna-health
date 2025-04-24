import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { format, addDays, parseISO } from 'date-fns';

interface CycleInsightsCardProps {
  nextPeriodDate: string | null;
  ovulationDate: string | null;
  cycleDays: number | null;
  currentDay: number | null;
}

const CycleInsightsCard: React.FC<CycleInsightsCardProps> = ({
  nextPeriodDate,
  ovulationDate,
  cycleDays,
  currentDay,
}) => {
  // Calculate days until next period
  const getDaysUntilNextPeriod = () => {
    if (!nextPeriodDate) return null;
    
    const today = new Date();
    const nextPeriod = parseISO(nextPeriodDate);
    
    const diffInTime = nextPeriod.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    
    return diffInDays;
  };
  
  const daysUntilNextPeriod = getDaysUntilNextPeriod();
  
  return (
    <Card
      title="Cycle Insights"
      style={styles.card}
    >
      <View style={styles.content}>
        {nextPeriodDate && (
          <View style={styles.insightItem}>
            <Text style={styles.insightTitle}>Next Period</Text>
            <Text style={styles.insightValue}>
              {format(parseISO(nextPeriodDate), 'MMM dd')}
              {daysUntilNextPeriod !== null && daysUntilNextPeriod >= 0 && (
                <Text style={styles.insightSubtitle}> ({daysUntilNextPeriod} days away)</Text>
              )}
            </Text>
          </View>
        )}
        
        {ovulationDate && (
          <View style={styles.insightItem}>
            <Text style={styles.insightTitle}>Ovulation Day</Text>
            <Text style={styles.insightValue}>
              {format(parseISO(ovulationDate), 'MMM dd')}
            </Text>
          </View>
        )}
        
        {cycleDays && currentDay && (
          <View style={styles.insightItem}>
            <Text style={styles.insightTitle}>Cycle Day</Text>
            <Text style={styles.insightValue}>
              {currentDay} <Text style={styles.insightSubtitle}>of ~{cycleDays}</Text>
            </Text>
          </View>
        )}
        
        {/* Cycle phase info */}
        <View style={styles.phaseContainer}>
          {currentDay && currentDay <= 5 && (
            <View style={styles.phase}>
              <View style={[styles.phaseIndicator, { backgroundColor: Colors.primary }]} />
              <Text style={styles.phaseText}>Menstrual Phase</Text>
            </View>
          )}
          
          {currentDay && currentDay > 5 && currentDay <= 13 && (
            <View style={styles.phase}>
              <View style={[styles.phaseIndicator, { backgroundColor: Colors.secondaryLight }]} />
              <Text style={styles.phaseText}>Follicular Phase</Text>
            </View>
          )}
          
          {currentDay && currentDay > 13 && currentDay <= 16 && (
            <View style={styles.phase}>
              <View style={[styles.phaseIndicator, { backgroundColor: Colors.secondary }]} />
              <Text style={styles.phaseText}>Ovulation Phase</Text>
            </View>
          )}
          
          {currentDay && currentDay > 16 && (
            <View style={styles.phase}>
              <View style={[styles.phaseIndicator, { backgroundColor: Colors.accentLight }]} />
              <Text style={styles.phaseText}>Luteal Phase</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  content: {
    paddingVertical: 8,
  },
  insightItem: {
    marginBottom: 16,
  },
  insightTitle: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
  },
  insightSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray600,
  },
  phaseContainer: {
    marginTop: 8,
  },
  phase: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  phaseIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  phaseText: {
    fontSize: 14,
    color: Colors.gray700,
  },
});

export default CycleInsightsCard;