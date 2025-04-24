import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { format } from 'date-fns';
import { X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useCycle } from '@/hooks/useCycle';
import { useWeather } from '@/hooks/useWeather';
import CycleStatus from '@/components/Home/CycleStatus';
import SymptomTracker from '@/components/Home/SymptomTracker';
import MoodTracker from '@/components/Home/MoodTracker';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function HomeScreen() {
  const { user } = useAuth();
  const { 
    currentCycle, 
    nextPeriodDate, 
    logPeriod, 
    logSymptom, 
    logMood, 
    endPeriod 
  } = useCycle();
  const { weather } = useWeather();
  
  const [isPeriodModalVisible, setIsPeriodModalVisible] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState<'light' | 'medium' | 'heavy' | 'spotting'>('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const handleLogPeriod = () => {
    setIsPeriodModalVisible(true);
  };
  
  const handleSubmitPeriod = () => {
    logPeriod(today, selectedFlow);
    setIsPeriodModalVisible(false);
  };
  
  const handleSelectSymptom = (symptomId: string) => {
    setSelectedSymptoms(prevSelected => {
      if (prevSelected.includes(symptomId)) {
        return prevSelected.filter(id => id !== symptomId);
      } else {
        return [...prevSelected, symptomId];
      }
    });
    
    logSymptom(today, symptomId);
  };
  
  const handleSelectMood = (moodId: string) => {
    setSelectedMoods(prevSelected => {
      if (prevSelected.includes(moodId)) {
        return prevSelected.filter(id => id !== moodId);
      } else {
        return [...prevSelected, moodId];
      }
    });
    
    logMood(today, moodId);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>
              Hello, {user?.name || 'there'}
            </Text>
            <Text style={styles.date}>
              {format(new Date(), 'EEEE, MMMM d')}
            </Text>
          </View>
          
          {weather && (
            <View style={styles.weatherContainer}>
              <Text style={styles.temperature}>{Math.round(weather.temperature)}°</Text>
              <Text style={styles.location}>{weather.location}</Text>
            </View>
          )}
        </View>
      </LinearGradient>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cycle Status Card */}
        <CycleStatus
          currentCycle={currentCycle}
          nextPeriodDate={nextPeriodDate}
          onLogPeriod={handleLogPeriod}
        />
        
        {/* Symptom Tracker */}
        <SymptomTracker
          onSelectSymptom={handleSelectSymptom}
          selectedSymptoms={selectedSymptoms}
        />
        
        {/* Mood Tracker */}
        <MoodTracker
          onSelectMood={handleSelectMood}
          selectedMoods={selectedMoods}
        />
      </ScrollView>
      
      {/* Period Log Modal */}
      <Modal
        visible={isPeriodModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPeriodModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Your Period</Text>
              <TouchableOpacity
                onPress={() => setIsPeriodModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.gray700} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>How heavy is your flow today?</Text>
            
            <View style={styles.flowOptions}>
              <TouchableOpacity
                style={[
                  styles.flowOption,
                  selectedFlow === 'spotting' && styles.selectedFlowOption
                ]}
                onPress={() => setSelectedFlow('spotting')}
              >
                <View style={[styles.flowIndicator, styles.spottingIndicator]} />
                <Text style={styles.flowLabel}>Spotting</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.flowOption,
                  selectedFlow === 'light' && styles.selectedFlowOption
                ]}
                onPress={() => setSelectedFlow('light')}
              >
                <View style={[styles.flowIndicator, styles.lightIndicator]} />
                <Text style={styles.flowLabel}>Light</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.flowOption,
                  selectedFlow === 'medium' && styles.selectedFlowOption
                ]}
                onPress={() => setSelectedFlow('medium')}
              >
                <View style={[styles.flowIndicator, styles.mediumIndicator]} />
                <Text style={styles.flowLabel}>Medium</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.flowOption,
                  selectedFlow === 'heavy' && styles.selectedFlowOption
                ]}
                onPress={() => setSelectedFlow('heavy')}
              >
                <View style={[styles.flowIndicator, styles.heavyIndicator]} />
                <Text style={styles.flowLabel}>Heavy</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalActions}>
              <Button
                title="Save"
                onPress={handleSubmitPeriod}
                style={styles.saveButton}
              />
              
              {currentCycle && (
                <Button
                  title="End Period"
                  onPress={() => {
                    endPeriod(today);
                    setIsPeriodModalVisible(false);
                  }}
                  variant="outline"
                  style={styles.endButton}
                />
              )}
            </View>
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
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  date: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Poppins-Regular',
  },
  weatherContainer: {
    alignItems: 'flex-end',
  },
  temperature: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  location: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollContent: {
    paddingBottom: 24,
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
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray800,
    fontFamily: 'Poppins-SemiBold',
  },
  closeButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.gray700,
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  flowOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  flowOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray200,
    width: '22%',
  },
  selectedFlowOption: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  flowIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 8,
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
    fontFamily: 'Poppins-Medium',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
  },
  endButton: {
    flex: 1,
    marginLeft: 8,
  },
});