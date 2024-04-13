// "StAuth10244: I Marmik Gelani, 000884216 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else."

// frontend/GameResultScreen.js

import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import bgImage from './assets/bg.jpeg';

const GameResultScreen = ({ navigation, route }) => {
    const { result, leaderboard } = route.params;
    const username = route.params.username; 

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>

            <View style={styles.container}>

                <View style={result === 'correct' ? styles.correctResult : styles.incorrectResult}>

                    <View style={styles.arrange}>
                        <Text style={styles.leaderboardTitle}>Leaderboard</Text>
                        <View style={styles.leaderboardContainer}>
                            {leaderboard && leaderboard.map((username, index) => (
                                <Text key={index} style={styles.leaderText}>
                                    {index + 1}. {username}
                                </Text>
                            ))}
                        </View>
                    </View>

                    <View style={styles.arrange2}>
                        <Text style={styles.resultText}>{result === 'correct' ? 'Correct!' : 'Incorrect!'}</Text>
                        <Button title="Try Again" onPress={() => navigation.navigate('MathGame', { username }) } />
                    </View>

                </View>

            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
    },
    arrange: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrange2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    correctResult: {
        backgroundColor: '#14a508eb',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    incorrectResult: {
        backgroundColor: '#ff0000e6',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    resultText: {
        fontSize: 24,
        color: 'white',
    },
    leaderboardTitle: {
        fontSize: 24,
        color: 'white',
        marginTop: 50,
    },
    leaderboardContainer: {
        marginVertical: 20,
        backgroundColor: '#000000bf',
        padding: 20,
        width: '100%',
        minHeight: '80vh',
    },
    leaderText: {
        fontSize: 20,
        color: 'white',
        backgroundColor: '#ffffff3d',
        padding: '13px',
        width: '100%',
        },
});

export default GameResultScreen;
