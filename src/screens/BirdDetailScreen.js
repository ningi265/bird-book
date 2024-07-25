// src/screens/BirdDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

const BirdDetailScreen = ({ route }) => {
  const { bird } = route.params;

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(bird.audio);
      await sound.playAsync();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={bird.image} style={styles.image} />
      <Text style={styles.name}>{bird.name}</Text>
      <Text style={styles.description}>{bird.description}</Text>
      <Button title="Play Bird Call" onPress={playSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BirdDetailScreen;
