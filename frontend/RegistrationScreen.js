// "StAuth10244: I Marmik Gelani, 000884216 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else."

// frontend/RegistrationScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import bgImage from './assets/bg.jpeg'; 

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const handleRegistration = () => {
    if (!username || !password || !confirmPassword) {
      setErrorMessage("All fields must be completed.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setErrorMessage('');
    
    registerUser(username, password);
  };

  const registerUser = (username, password) => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        navigation.navigate('Login');
      } else {
        setErrorMessage(data.message || "Registration failed. Please try again.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    });
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        {errorMessage.length > 0 && <Text style={styles.errorText}>{errorMessage}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Register" onPress={handleRegistration} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '50%',
    backgroundColor: 'aliceblue',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegistrationScreen;
