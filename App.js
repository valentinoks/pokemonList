import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, StatusBar, Text, Platform, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './components/list';
import MyList from './components/myList';
import Input from './components/input';
import Detail from './components/detail';
// import { StatusBar } from 'expo-status-bar';
import { logToConsole } from 'react-native/Libraries/Utilities/RCTLog';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={List}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="MyList"
          component={MyList}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Input"
          component={Input}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}