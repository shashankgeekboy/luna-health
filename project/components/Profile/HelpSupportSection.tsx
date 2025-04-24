import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { CircleHelp as HelpCircle, Book, MessageCircle, Phone } from 'lucide-react-native';

export default function HelpSupportSection() {
  const openFAQ = () => {
    // Implement FAQ navigation
  };

  const openGuides = () => {
    // Implement guides navigation
  };

  const openChat = () => {
    // Implement chat support
  };

  const callSupport = () => {
    Linking.openURL('tel:+1234567890');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Help & Support</Text>
      
      <TouchableOpacity style={styles.item} onPress={openFAQ}>
        <View style={styles.iconContainer}>
          <HelpCircle size={24} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>FAQ</Text>
          <Text style={styles.description}>Find answers to common questions</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item} onPress={openGuides}>
        <View style={styles.iconContainer}>
          <Book size={24} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>User Guides</Text>
          <Text style={styles.description}>Learn how to use the app</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item} onPress={openChat}>
        <View style={styles.iconContainer}>
          <MessageCircle size={24} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Chat Support</Text>
          <Text style={styles.description}>Talk to our support team</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item} onPress={callSupport}>
        <View style={styles.iconContainer}>
          <Phone size={24} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Call Support</Text>
          <Text style={styles.description}>Speak with a representative</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontSize: 14,
    color: Colors.gray600,
    fontFamily: 'Poppins-Regular',
  },
});