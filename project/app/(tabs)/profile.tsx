import React from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Alert
} from 'react-native';
import { User, Bell, Shield, CircleHelp as HelpCircle, Share2, LogOut, ChevronRight, MailQuestion } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import Card from '@/components/ui/Card';
import SecuritySection from '@/components/Profile/SecuritySection';
import HelpSupportSection from '@/components/Profile/HelpSupportSection';
import InviteFriendsSection from '@/components/Profile/InviteFriendsSection';
import ContactSection from '@/components/Profile/ContactSection';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            await signOut();
            router.replace('/signin');
          },
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        
        <View style={styles.content}>
          {/* Profile Card */}
          <Card style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user?.user_metadata?.name?.charAt(0) || 'U'}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.user_metadata?.name || 'User'}</Text>
                <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </Card>
          
          {/* Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <Card style={styles.settingsCard}>
              {/* Notifications */}
              <View style={styles.settingRow}>
                <View style={styles.settingLeftContent}>
                  <View style={styles.settingIconContainer}>
                    <Bell size={20} color={Colors.primary} />
                  </View>
                  <Text style={styles.settingText}>Notifications</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: Colors.gray300, true: Colors.primaryLight }}
                  thumbColor={notificationsEnabled ? Colors.primary : Colors.gray100}
                />
              </View>
            </Card>
          </View>
          
          {/* Security Section */}
          <SecuritySection />
          
          {/* Help & Support Section */}
          <HelpSupportSection />
          
          {/* Invite Friends Section */}
          <InviteFriendsSection />
          
          {/* Contact Section */}
          <ContactSection />
          
          {/* Sign Out */}
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <LogOut size={20} color={Colors.error} style={styles.signOutIcon} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
  profileCard: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.gray600,
    fontFamily: 'Poppins-Regular',
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignSelf: 'flex-start',
  },
  editProfileText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  settingsCard: {
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  settingLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: Colors.gray700,
    fontFamily: 'Poppins-Regular',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.errorLight,
    borderRadius: 12,
    marginBottom: 16,
  },
  signOutIcon: {
    marginRight: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
    fontFamily: 'Poppins-SemiBold',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.gray500,
    fontFamily: 'Poppins-Regular',
  },
});