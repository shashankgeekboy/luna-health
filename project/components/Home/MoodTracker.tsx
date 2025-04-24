import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Smile, Frown, Wind, TriangleAlert as AlertTriangle, Leaf, Zap, BatteryCharging, Sun } from 'lucide-react-native';

interface Mood {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected?: boolean;
}

interface MoodTrackerProps {
  onSelectMood: (moodId: string) => void;
  selectedMoods: string[];
}

const MoodTracker: React.FC<MoodTrackerProps> = ({
  onSelectMood,
  selectedMoods = [],
}) => {
  const moods: Mood[] = [
    { 
      id: 'happy', 
      name: 'Happy', 
      icon: <Smile size={20} color={Colors.secondary} />,
      selected: selectedMoods.includes('happy'),
    },
    { 
      id: 'sad', 
      name: 'Sad', 
      icon: <Frown size={20} color={Colors.secondary} />,
      selected: selectedMoods.includes('sad'),
    },
    { 
      id: 'anxious', 
      name: 'Anxious', 
      icon: <AlertTriangle size={20} color={Colors.secondary} />,
      selected: selectedMoods.includes('anxious'),
    },
    { 
      id: 'calm', 
      name: 'Calm', 
      icon: <Leaf size={20} color={Colors.secondary} />,
      selected: selectedMoods.includes('calm'),
    },
    { 
      id: 'irritable', 
      name: 'Irritable', 
      icon: <Zap size={20} color={Colors.secondary} />,
      selected: selectedMoods.includes('irritable'),
    },
    { 
      id: 'energetic', 
      name: 'Energetic', 
      icon: <BatteryCharging size={20} color={Colors.secondary} />,
      selected: selectedMoods.includes('energetic'),
    },
    { 
      id: 'content', 
      name: 'Content', 
      icon: <Sun size={20} color={Colors.secondary} />,
      selected: selectedMoods.includes('content'),
    },
  ];
  
  return (
    <Card 
      title="Track Mood" 
      subtitle="How do you feel emotionally?"
      style={styles.card}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moodsContainer}
      >
        {moods.map(mood => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodButton,
              mood.selected && styles.selectedMood
            ]}
            onPress={() => onSelectMood(mood.id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {mood.icon}
            </View>
            <Text style={[
              styles.moodText,
              mood.selected && styles.selectedMoodText
            ]}>
              {mood.name}
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
    marginBottom: 16,
  },
  moodsContainer: {
    paddingVertical: 8,
  },
  moodButton: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: Colors.gray50,
    borderRadius: 12,
    padding: 12,
    width: 80,
  },
  selectedMood: {
    backgroundColor: Colors.secondaryLight,
    borderColor: Colors.secondary,
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
  moodText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.gray700,
    textAlign: 'center',
  },
  selectedMoodText: {
    color: Colors.secondary,
    fontWeight: '600',
  },
});

export default MoodTracker;