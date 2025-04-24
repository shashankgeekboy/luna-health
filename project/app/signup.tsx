import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  
  const validateInputs = () => {
    let isValid = true;
    
    // Validate name
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };
  
  const handleSignUp = async () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, name);
      router.replace('/home');
    } catch (error) {
      console.error('Sign up error:', error);
      setEmailError('This email might already be in use');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar style="dark" />
      
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Link href="/signin">
            <TouchableOpacity style={styles.backButton}>
              <ArrowLeft size={24} color={Colors.gray800} />
            </TouchableOpacity>
          </Link>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to start tracking your cycle</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            error={nameError}
            icon={<User size={20} color={Colors.gray500} />}
          />
          
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            icon={<Mail size={20} color={Colors.gray500} />}
          />
          
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Choose a password"
            secureTextEntry
            error={passwordError}
            icon={<Lock size={20} color={Colors.gray500} />}
          />
          
          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={isLoading}
            style={styles.button}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/signin">
            <TouchableOpacity>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.gray800,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray600,
  },
  formContainer: {
    marginBottom: 40,
  },
  button: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.gray600,
    fontSize: 16,
    marginRight: 4,
  },
  signInText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});