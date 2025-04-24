import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Lock, Key, Shield, Bell } from 'lucide-react-native';

export default function SecuritySection() {
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Security Settings</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Lock size={24} color={Colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Change Password</Text>
          <Text style={styles.settingDescription}>Update your account password</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Shield size={24} color={Colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
          <Text style={styles.settingDescription}>Add extra security to your account</Text>
        </View>
        <Switch
          value={twoFactorEnabled}
          onValueChange={setTwoFactorEnabled}
          trackColor={{ false: Colors.gray300, true: Colors.primaryLight }}
          thumbColor={twoFactorEnabled ? Colors.primary : Colors.gray100}
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Key size={24} color={Colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Biometric Login</Text>
          <Text style={styles.settingDescription}>Use fingerprint or face ID</Text>
        </View>
        <Switch
          value={biometricEnabled}
          onValueChange={setBiometricEnabled}
          trackColor={{ false: Colors.gray300, true: Colors.primaryLight }}
          thumbColor={biometricEnabled ? Colors.primary : Colors.gray100}
        />
      </View>
      
      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Bell size={24} color={Colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>Login Notifications</Text>
          <Text style={styles.settingDescription}>Get notified of new logins</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Configure</Text>
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
  settingItem: {
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
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.gray600,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});