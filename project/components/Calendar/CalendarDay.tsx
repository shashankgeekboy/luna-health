import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { format, isToday, isSameDay, parseISO } from 'date-fns';
import { Colors } from '@/constants/Colors';

interface CalendarDayProps {
  date: Date;
  onSelect: (date: Date) => void;
  isPeriod?: boolean;
  isOvulation?: boolean;
  isFertile?: boolean;
  isSelected?: boolean;
  hasPeriodLog?: boolean;
  hasSymptomLog?: boolean;
  hasMoodLog?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  onSelect,
  isPeriod = false,
  isOvulation = false,
  isFertile = false,
  isSelected = false,
  hasPeriodLog = false,
  hasSymptomLog = false,
  hasMoodLog = false,
  style,
}) => {
  const dayNumber = format(date, 'd');
  const isCurrentDay = isToday(date);
  
  // Determine the main background style
  const getBackgroundStyle = () => {
    if (isSelected) return styles.selectedDay;
    if (isPeriod) return styles.periodDay;
    if (isOvulation) return styles.ovulationDay;
    if (isFertile) return styles.fertileDay;
    if (isCurrentDay) return styles.currentDay;
    return null;
  };
  
  // Determine the text color
  const getTextStyle = () => {
    if (isSelected || isPeriod) return styles.selectedDayText;
    if (isOvulation) return styles.ovulationDayText;
    if (isFertile) return styles.fertileDayText;
    if (isCurrentDay) return styles.currentDayText;
    return styles.dayText;
  };
  
  return (
    <TouchableOpacity
      style={[styles.dayContainer, style]}
      onPress={() => onSelect(date)}
      activeOpacity={0.7}
    >
      <View style={[styles.day, getBackgroundStyle()]}>
        <Text style={[styles.dayText, getTextStyle()]}>{dayNumber}</Text>
      </View>
      
      {/* Indicators for logs */}
      {(hasPeriodLog || hasSymptomLog || hasMoodLog) && (
        <View style={styles.indicators}>
          {hasPeriodLog && <View style={[styles.indicator, styles.periodIndicator]} />}
          {hasSymptomLog && <View style={[styles.indicator, styles.symptomIndicator]} />}
          {hasMoodLog && <View style={[styles.indicator, styles.moodIndicator]} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  day: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray700,
  },
  currentDay: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  currentDayText: {
    fontWeight: '600',
    color: Colors.primary,
  },
  selectedDay: {
    backgroundColor: Colors.primary,
  },
  selectedDayText: {
    color: 'white',
    fontWeight: '600',
  },
  periodDay: {
    backgroundColor: Colors.primary,
  },
  periodDayText: {
    color: 'white',
    fontWeight: '600',
  },
  ovulationDay: {
    backgroundColor: Colors.secondary,
  },
  ovulationDayText: {
    color: 'white',
    fontWeight: '600',
  },
  fertileDay: {
    backgroundColor: Colors.secondaryLight,
  },
  fertileDayText: {
    color: Colors.secondary,
    fontWeight: '600',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  periodIndicator: {
    backgroundColor: Colors.primary,
  },
  symptomIndicator: {
    backgroundColor: Colors.secondary,
  },
  moodIndicator: {
    backgroundColor: Colors.accent,
  },
});

export default CalendarDay;