import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addDays, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import CalendarDay from './CalendarDay';
import { Colors } from '@/constants/Colors';
import { CycleData, CycleDay } from '@/types';

interface CalendarViewProps {
  cycles: CycleData[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  ovulationDate?: string | null;
  fertileDays?: string[];
  nextPeriodDate?: string | null;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  cycles,
  selectedDate,
  onSelectDate,
  ovulationDate,
  fertileDays = [],
  nextPeriodDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Get all days of the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get days from the previous month to fill the first week
  const startDayOfWeek = getDay(monthStart);
  const prevMonthDays = startDayOfWeek > 0
    ? eachDayOfInterval({
        start: addDays(monthStart, -startDayOfWeek),
        end: addDays(monthStart, -1),
      })
    : [];
  
  // Get days from the next month to fill the last week
  const endDayOfWeek = getDay(monthEnd);
  const nextMonthDays = endDayOfWeek < 6
    ? eachDayOfInterval({
        start: addDays(monthEnd, 1),
        end: addDays(monthEnd, 6 - endDayOfWeek),
      })
    : [];
  
  const allDays = [...prevMonthDays, ...monthDays, ...nextMonthDays];
  
  // Check if a date is within a period cycle
  const isPeriodDay = (date: Date) => {
    return cycles.some(cycle => {
      if (!cycle.startDate) return false;
      
      const startDate = parseISO(cycle.startDate);
      
      if (cycle.endDate) {
        const endDate = parseISO(cycle.endDate);
        return date >= startDate && date <= endDate;
      } else {
        // For current cycle without end date, check days array
        return cycle.days.some(day => {
          return isSameDay(date, parseISO(day.date)) && day.flow;
        });
      }
    });
  };
  
  // Check if a day has logs
  const hasLogs = (date: Date) => {
    let logs = {
      hasPeriodLog: false,
      hasSymptomLog: false,
      hasMoodLog: false,
    };
    
    for (const cycle of cycles) {
      for (const day of cycle.days) {
        if (isSameDay(date, parseISO(day.date))) {
          if (day.flow) logs.hasPeriodLog = true;
          if (day.symptoms && day.symptoms.length > 0) logs.hasSymptomLog = true;
          if (day.mood && day.mood.length > 0) logs.hasMoodLog = true;
          return logs;
        }
      }
    }
    
    return logs;
  };
  
  // Check if a date is the predicted ovulation day
  const isOvulationDay = (date: Date) => {
    if (!ovulationDate) return false;
    return isSameDay(date, parseISO(ovulationDate));
  };
  
  // Check if a date is within the fertile window
  const isFertileDay = (date: Date) => {
    if (!fertileDays || fertileDays.length === 0) return false;
    return fertileDays.some(day => isSameDay(date, parseISO(day)));
  };
  
  // Check if a date is the predicted next period
  const isNextPeriodDay = (date: Date) => {
    if (!nextPeriodDate) return false;
    return isSameDay(date, parseISO(nextPeriodDate));
  };
  
  // Generate calendar weeks
  const weeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }
  
  return (
    <View style={styles.container}>
      {/* Month navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
          <ChevronLeft size={24} color={Colors.gray700} />
        </TouchableOpacity>
        <Text style={styles.monthText}>{format(currentMonth, 'MMMM yyyy')}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <ChevronRight size={24} color={Colors.gray700} />
        </TouchableOpacity>
      </View>
      
      {/* Week days header */}
      <View style={styles.weekDaysContainer}>
        {weekDays.map(day => (
          <Text key={day} style={styles.weekDay}>{day}</Text>
        ))}
      </View>
      
      {/* Calendar days */}
      <View style={styles.daysContainer}>
        {weeks.map((week, weekIndex) => (
          <View key={`week-${weekIndex}`} style={styles.weekRow}>
            {week.map(date => {
              const logs = hasLogs(date);
              return (
                <CalendarDay
                  key={date.toString()}
                  date={date}
                  onSelect={onSelectDate}
                  isPeriod={isPeriodDay(date) || isNextPeriodDay(date)}
                  isOvulation={isOvulationDay(date)}
                  isFertile={isFertileDay(date)}
                  isSelected={isSameDay(date, selectedDate)}
                  hasPeriodLog={logs.hasPeriodLog}
                  hasSymptomLog={logs.hasSymptomLog}
                  hasMoodLog={logs.hasMoodLog}
                />
              );
            })}
          </View>
        ))}
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.periodColor]} />
          <Text style={styles.legendText}>Period</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.ovulationColor]} />
          <Text style={styles.legendText}>Ovulation</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.fertileColor]} />
          <Text style={styles.legendText}>Fertile</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 12,
    color: Colors.gray500,
  },
  daysContainer: {
    marginBottom: 16,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  periodColor: {
    backgroundColor: Colors.primary,
  },
  ovulationColor: {
    backgroundColor: Colors.secondary,
  },
  fertileColor: {
    backgroundColor: Colors.secondaryLight,
  },
  legendText: {
    fontSize: 12,
    color: Colors.gray700,
  },
});

export default CalendarView;