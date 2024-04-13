// "StAuth10244: I Marmik Gelani, 000884216 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else."

// frontend/LoginScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setLoading(false);

      if (data.status === 'success') {
        navigation.navigate('MathGame', { username }); 
      } else {
        setError('Username and/or password incorrect.');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.arrange}>
          {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Log in" onPress={handleLogin} />
          )}
        </View>
        <View style={styles.arrange2}>
          <Button
            title="Sign up"
            onPress={() => navigation.navigate('Register')}
            color="#128362"
          />
        </View>
      </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center', 
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    backgroundColour: 'white', 
  },
  arrange: {
    width: '50%',
    height: '50vh',
    justifyContent: 'center',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  arrange2: {
    width: '50%',
    height: '25vh',
    justifyContent: 'center',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColour: 'aliceblue', 
  },
  errorText: {
    colour: 'red', 
    display: 'flex',
    justifyContent: 'center', 
    marginBottom: 10,
  },
});

export default LoginScreen;
