import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
  Merriweather_900Black,
} from '@expo-google-fonts/merriweather';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Merriweather-Regular': Merriweather_400Regular,
    'Merriweather-Bold': Merriweather_700Bold,
    'Merriweather-Black': Merriweather_900Black,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fcfaf5', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#6b4028" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ChatScreen />
    </SafeAreaProvider>
  );
}
