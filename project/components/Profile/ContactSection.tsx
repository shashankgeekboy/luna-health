import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react-native';

export default function ContactSection() {
  const sendEmail = () => {
    Linking.openURL('mailto:support@lunahealth.com');
  };

  const openChat = () => {
    // Implement chat support
  };

  const makeCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const openMap = () => {
    // Implement map opening
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Contact Us</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Get in Touch</Text>
        <Text style={styles.cardDescription}>
          We're here to help! Choose your preferred way to reach us.
        </Text>
        
        <TouchableOpacity style={styles.contactItem} onPress={sendEmail}>
          <View style={styles.iconContainer}>
            <Mail size={24} color={Colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Email Us</Text>
            <Text style={styles.contactValue}>support@lunahealth.com</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactItem} onPress={openChat}>
          <View style={styles.iconContainer}>
            <MessageCircle size={24} color={Colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactValue}>Available 24/7</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactItem} onPress={makeCall}>
          <View style={styles.iconContainer}>
            <Phone size={24} color={Colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Call Us</Text>
            <Text style={styles.contactValue}>+1 (234) 567-890</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactItem} onPress={openMap}>
          <View style={styles.iconContainer}>
            <MapPin size={24} color={Colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Visit Us</Text>
            <Text style={styles.contactValue}>123 Health Street, CA 94105</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
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
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  contactValue: {
    fontSize: 14,
    color: Colors.gray600,
    fontFamily: 'Poppins-Regular',
  },
});