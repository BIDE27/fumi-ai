import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'GoogleSans-Regular': require('./assets/fonts/GoogleSans-Regular.ttf'),
    'GoogleSans-Medium': require('./assets/fonts/GoogleSans-Medium.ttf'),
    'GoogleSans-Bold': require('./assets/fonts/GoogleSans-Bold.ttf'),
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
