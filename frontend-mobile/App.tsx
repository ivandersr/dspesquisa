import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';

import Header from './src/components/Header';
import Routes from './src/routes';

import { 
  useFonts, 
  Play_400Regular, 
  Play_700Bold,
} from '@expo-google-fonts/play';

export default function App() {
  let [ fontsLoaded ] = useFonts({
    Play_400Regular,
    Play_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <>
        <StatusBar style="light"/>
        <View style={styles.container}>       
          <Routes />
        </View>
      </>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

