// "StAuth10244: I Marmik Gelani, 000884216 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else."

// frontend/App.js

import React from 'react';
import { UserProvider } from './UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MathGameScreen from './MathGameScreen';
import GameResultScreen from './GameResultScreen';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }} 
          />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{ title: 'Register' }} 
          />
          <Stack.Screen
            name="GameResult"
            component={GameResultScreen}
            options={{ title: 'Game Result' }} 
          />
          <Stack.Screen
            name="MathGame"
            component={MathGameScreen}
            options={{ title: 'Math Game' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
