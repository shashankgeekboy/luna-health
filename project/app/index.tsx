import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { isLoading, user } = useAuth();
  
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  if (user) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/signin" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.gray600,
  },
});