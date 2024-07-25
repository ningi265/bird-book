// src/components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ searchQuery, setSearchQuery, onSelectImage, onTakePhoto }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconWrapper} onPress={onSelectImage}>
        <Icon name="image" size={25} color="#4CAF50"/>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search birds..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity style={styles.iconWrapper} onPress={onTakePhoto}>
        <Icon name="camera" size={25} color="#2196F3"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }], // Center vertically
    zIndex: 1,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 50, // Adjust padding to make space for the icons
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default SearchBar;
