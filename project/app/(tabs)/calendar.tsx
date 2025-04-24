import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { useCycle } from '@/hooks/useCycle';
import { useSymptoms, useMoods } from '@/hooks/useData';
import { Colors } from '@/constants/Colors';
import { X } from 'lucide-react-native';
import CalendarView from '@/components/Calendar/CalendarView';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { cycles, currentCycle, nextPeriodDate, ovulationDate, fertileDays, logPeriod, logSymptom, logMood } = useCycle();
  const { symptoms } = useSymptoms();
  const { moods } = useMoods();
  const [isLogModalVisible, setIsLogModalVisible] = useState(false);
  
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  
  // Find logs for the selected date
  const getDayLogs = () => {
    for (const cycle of cycles) {
      for (const day of cycle.days) {
        if (day.date === formattedDate) {
          return day;
        }
      }
    }
    return null;
  };
  
  const dayLogs = getDayLogs();
  
  const handleAddLog = () => {
    setIsLogModalVisible(true);
  };
  
  const handleSelectSymptom = (symptomId: string) => {
    logSymptom(formattedDate, symptomId);
  };
  
  const handleSelectMood = (moodId: string) => {
    logMood(formattedDate, moodId);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Calendar</Text>
        </View>
        
        <View style={styles.content}>
          {/* Calendar */}
          <CalendarView
            cycles={cycles}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            ovulationDate={ovulationDate}
            fertileDays={fertileDays}
            nextPeriodDate={nextPeriodDate}
          />
          
          {/* Selected Date Info */}
          <Card style={styles.dateInfoCard}>
            <Text style={styles.selectedDateText}>{format(selectedDate, 'MMMM d, yyyy')}</Text>
            
            {dayLogs ? (
              <View style={styles.logsContainer}>
                {dayLogs.flow && (
                  <View style={styles.logItem}>
                    <Text style={styles.logTitle}>Period</Text>
                    <View style={[styles.logValue, styles[`${dayLogs.flow}Flow`]]}>
                      <Text style={styles.logValueText}>{dayLogs.flow}</Text>
                    </View>
                  </View>
                )}
                
                {dayLogs.symptoms && dayLogs.symptoms.length > 0 && (
                  <View style={styles.logItem}>
                    <Text style={styles.logTitle}>Symptoms</Text>
                    <View style={styles.tagsContainer}>
                      {dayLogs.symptoms.map(symptom => (
                        <View key={symptom} style={styles.tag}>
                          <Text style={styles.tagText}>{symptom}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
                
                {dayLogs.mood && dayLogs.mood.length > 0 && (
                  <View style={styles.logItem}>
                    <Text style={styles.logTitle}>Mood</Text>
                    <View style={styles.tagsContainer}>
                      {dayLogs.mood.map(mood => (
                        <View key={mood} style={[styles.tag, styles.moodTag]}>
                          <Text style={styles.tagText}>{mood}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
                
                {dayLogs.notes && (
                  <View style={styles.logItem}>
                    <Text style={styles.logTitle}>Notes</Text>
                    <Text style={styles.noteText}>{dayLogs.notes}</Text>
                  </View>
                )}
              </View>
            ) : (
              <Text style={styles.noLogsText}>No logs for this day</Text>
            )}
            
            <Button
              title={dayLogs ? "Update Log" : "Add Log"}
              onPress={handleAddLog}
              style={styles.addButton}
            />
          </Card>
        </View>
      </ScrollView>
      
      {/* Log Modal */}
      <Modal
        visible={isLogModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsLogModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log for {format(selectedDate, 'MMMM d, yyyy')}</Text>
              <TouchableOpacity
                onPress={() => setIsLogModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.gray700} />
              </TouchableOpacity>
            </View>
            
            {/* Period Flow */}
            <Text style={styles.sectionTitle}>Period Flow</Text>
            <View style={styles.flowOptions}>
              {['spotting', 'light', 'medium', 'heavy'].map((flow) => (
                <TouchableOpacity
                  key={flow}
                  style={[
                    styles.flowOption,
                    dayLogs?.flow === flow && styles.selectedFlowOption
                  ]}
                  onPress={() => {
                    logPeriod(formattedDate, flow as any);
                  }}
                >
                  <View style={[styles.flowIndicator, styles[`${flow}Indicator`]]} />
                  <Text style={styles.flowLabel}>{flow.charAt(0).toUpperCase() + flow.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Symptoms */}
            <Text style={styles.sectionTitle}>Symptoms</Text>
            <View style={styles.gridContainer}>
              {symptoms.map(symptom => (
                <TouchableOpacity
                  key={symptom.id}
                  style={[
                    styles.gridItem,
                    dayLogs?.symptoms?.includes(symptom.name) && styles.selectedGridItem
                  ]}
                  onPress={() => handleSelectSymptom(symptom.name)}
                >
                  <Text style={styles.gridItemText}>{symptom.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Moods */}
            <Text style={styles.sectionTitle}>Mood</Text>
            <View style={styles.gridContainer}>
              {moods.map(mood => (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.gridItem,
                    styles.moodItem,
                    dayLogs?.mood?.includes(mood.name) && styles.selectedMoodItem
                  ]}
                  onPress={() => handleSelectMood(mood.name)}
                >
                  <Text style={styles.gridItemText}>{mood.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Button
              title="Save"
              onPress={() => setIsLogModalVisible(false)}
              style={styles.saveButton}
            />
          </View>
        </View>
      </Modal>
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
  dateInfoCard: {
    marginTop: 16,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  logsContainer: {
    marginBottom: 16,
  },
  logItem: {
    marginBottom: 12,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray600,
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
  logValue: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  lightFlow: {
    backgroundColor: Colors.primaryLight,
  },
  mediumFlow: {
    backgroundColor: Colors.primary,
  },
  heavyFlow: {
    backgroundColor: Colors.primaryDark,
  },
  spottingFlow: {
    backgroundColor: Colors.gray200,
  },
  logValueText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  moodTag: {
    backgroundColor: Colors.secondaryLight,
  },
  tagText: {
    color: Colors.gray700,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  noteText: {
    fontSize: 14,
    color: Colors.gray700,
    fontFamily: 'Poppins-Regular',
  },
  noLogsText: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  addButton: {
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    fontFamily: 'Poppins-SemiBold',
  },
  closeButton: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray700,
    marginBottom: 12,
    marginTop: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  flowOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  flowOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray200,
    width: '23%',
  },
  selectedFlowOption: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  flowIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  spottingIndicator: {
    backgroundColor: Colors.gray300,
  },
  lightIndicator: {
    backgroundColor: Colors.primaryLight,
  },
  mediumIndicator: {
    backgroundColor: Colors.primary,
  },
  heavyIndicator: {
    backgroundColor: Colors.primaryDark,
  },
  flowLabel: {
    fontSize: 12,
    color: Colors.gray700,
    fontFamily: 'Poppins-Regular',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  gridItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.gray100,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  moodItem: {
    backgroundColor: Colors.gray100,
  },
  selectedGridItem: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  selectedMoodItem: {
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  gridItemText: {
    fontSize: 14,
    color: Colors.gray700,
    fontFamily: 'Poppins-Regular',
  },
  saveButton: {
    marginTop: 24,
  },
});