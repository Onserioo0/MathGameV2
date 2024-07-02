// frontend/GameResultScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Animated } from 'react-native';
import bgImage from './assets/bg.jpeg';

const GameResultScreen = ({ navigation, route }) => {
    const { result, leaderboard } = route.params;
    const username = route.params.username;

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 3,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        result === 'correct' ? styles.correctResult : styles.incorrectResult,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}
                >
                    <View style={styles.arrange}>
                        <Text style={styles.leaderboardTitle}>Leaderboard</Text>
                        <Animated.View style={[styles.leaderboardContainer, { opacity: fadeAnim }]}>
                            {leaderboard && leaderboard.map((entry, index) => (
                                <Animated.Text
                                    key={index}
                                    style={[
                                        styles.leaderText,
                                        {
                                            opacity: fadeAnim,
                                            transform: [{
                                                translateX: fadeAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-50, 0]
                                                })
                                            }]
                                        }
                                    ]}
                                >
                                    {index + 1}. {entry.username} - Score: {entry.score}
                                </Animated.Text>
                            ))}
                        </Animated.View>
                    </View>

                    <Animated.View
                        style={[
                            styles.arrange2,
                            {
                                opacity: fadeAnim,
                                transform: [{
                                    translateY: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50, 0]
                                    })
                                }]
                            }
                        ]}
                    >
                        <Text style={styles.resultText}>{result === 'correct' ? 'Correct!' : 'Incorrect!'}</Text>
                        <Button title="Try Again" onPress={() => navigation.navigate('MathGame', { username })} />
                    </Animated.View>
                </Animated.View>
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
        fontSize: 18,
        color: 'white',
        backgroundColor: '#ffffff3d',
        padding: 10,
        marginBottom: 5,
        width: '100%',
    },
});

export default GameResultScreen;
