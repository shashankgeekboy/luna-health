import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Share2, Mail, MessageCircle, Copy } from 'lucide-react-native';

export default function InviteFriendsSection() {
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Track your cycle with LunaHealth! Download now: [App Store Link]',
        title: 'Join me on LunaHealth',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyInviteLink = () => {
    // Implement copy to clipboard
  };

  const sendEmail = () => {
    // Implement email sharing
  };

  const sendMessage = () => {
    // Implement message sharing
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Invite Friends</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Share LunaHealth</Text>
        <Text style={styles.cardDescription}>
          Invite your friends to join LunaHealth and track their cycle together.
        </Text>
        
        <View style={styles.shareOptions}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <View style={styles.iconContainer}>
              <Share2 size={24} color={Colors.primary} />
            </View>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton} onPress={sendEmail}>
            <View style={styles.iconContainer}>
              <Mail size={24} color={Colors.primary} />
            </View>
            <Text style={styles.buttonText}>Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton} onPress={sendMessage}>
            <View style={styles.iconContainer}>
              <MessageCircle size={24} color={Colors.primary} />
            </View>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.copyLink} onPress={copyInviteLink}>
          <Copy size={20} color={Colors.gray600} />
          <Text style={styles.copyText}>Copy Invite Link</Text>
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
  shareOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  shareButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.gray700,
    fontFamily: 'Poppins-Medium',
  },
  copyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  copyText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.gray600,
    fontFamily: 'Poppins-Medium',
  },
});