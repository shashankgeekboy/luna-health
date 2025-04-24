import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Activity, Brain, Clipboard, Heart, ThermometerSun } from 'lucide-react-native';

interface Symptom {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected?: boolean;
}

interface SymptomTrackerProps {
  onSelectSymptom: (symptomId: string) => void;
  selectedSymptoms: string[];
}

const SymptomTracker: React.FC<SymptomTrackerProps> = ({
  onSelectSymptom,
  selectedSymptoms = [],
}) => {
  const symptoms: Symptom[] = [
    { 
      id: 'cramps', 
      name: 'Cramps', 
      icon: <Activity size={20} color={Colors.primary} />,
      selected: selectedSymptoms.includes('cramps'),
    },
    { 
      id: 'headache', 
      name: 'Headache', 
      icon: <Brain size={20} color={Colors.primary} />,
      selected: selectedSymptoms.includes('headache'),
    },
    { 
      id: 'bloating', 
      name: 'Bloating', 
      icon: <ThermometerSun size={20} color={Colors.primary} />,
      selected: selectedSymptoms.includes('bloating'),
    },
    { 
      id: 'tender_breasts', 
      name: 'Tender Breasts', 
      icon: <Heart size={20} color={Colors.primary} />,
      selected: selectedSymptoms.includes('tender_breasts'),
    },
    { 
      id: 'fatigue', 
      name: 'Fatigue', 
      icon: <Clipboard size={20} color={Colors.primary} />,
      selected: selectedSymptoms.includes('fatigue'),
    },
  ];
  
  return (
    <Card 
      title="Track Symptoms" 
      subtitle="How are you feeling today?"
      style={styles.card}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.symptomsContainer}
      >
        {symptoms.map(symptom => (
          <TouchableOpacity
            key={symptom.id}
            style={[
              styles.symptomButton,
              symptom.selected && styles.selectedSymptom
            ]}
            onPress={() => onSelectSymptom(symptom.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {symptom.icon}
            </View>
            <Text style={[
              styles.symptomText,
              symptom.selected && styles.selectedSymptomText
            ]}>
              {symptom.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  symptomsContainer: {
    paddingVertical: 8,
  },
  symptomButton: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: Colors.gray50,
    borderRadius: 12,
    padding: 12,
    width: 100,
  },
  selectedSymptom: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  symptomText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.gray700,
    textAlign: 'center',
  },
  selectedSymptomText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default SymptomTracker;