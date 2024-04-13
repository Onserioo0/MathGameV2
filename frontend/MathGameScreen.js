// "StAuth10244: I Marmik Gelani, 000884216 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else."

// frontend/MathGameScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import bgImage from './assets/bg.jpeg';

const MathGameScreen = ({ navigation, route }) => {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 100) + 1);
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 100) + 1);
  const [answer, setAnswer] = useState('');
  const username = route.params.username; 
  const checkAnswer = async () => {
    const correct = parseInt(answer) === number1 + number2;
    const result = correct ? 'correct' : 'incorrect';


    try {
      const response = await fetch('http://localhost:3000/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, result }),
      });
      const data = await response.json();

      if (response.ok) {
        navigation.navigate('GameResult', {
          result: correct ? 'correct' : 'incorrect',
          leaderboard: data.leaders,
          username
        });
      } else {
        Alert.alert('Error', 'There was an issue updating the leaderboard.');
      }
    } catch (error) {
      console.error('Failed to update leaderboard', error);
    }

    setAnswer('');
    setNumber1(Math.floor(Math.random() * 100) + 1);
    setNumber2(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.question}>What is {number1} + {number2}?</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={answer}
          onChangeText={setAnswer}
          placeholder="Your answer"
        />
        <Button title="Submit" onPress={checkAnswer} color={"#012557cf"} style={styles.submitBtn}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '7pc',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffffed',
  },
  arrange: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  question: {
    fontSize: 24,
    margin: 20,
  },
  input: {
    fontSize: 24,
    height: '5pc',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 10,
    padding: '2pc',
    borderRadius: '1pc',
  },
  submitBtn: {
    paddingHorizontal: '1pc',
    paddingVertical: '1pc',
    padding: '1pc',
    width: '100vw',
  },
  error: {
    fontSize: 24,
    margin: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MathGameScreen;