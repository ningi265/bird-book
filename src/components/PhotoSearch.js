import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';



const apikey = 'AIzaSyCM5rgAAuPgKWJdh9FBJ-vLmAeLNKsmVH4';
const apiUri = `https://vision.googleapis.com/v1/images:annotate?key=${apikey}`;

const PhotoSearch = ({ onSearch }) => {
  const [imageUri, setImageUri] = useState(null);

  const processImage = async (uri) => {
    try {
      const base64 = await toBase64(uri);
      const response = await axios.post(apiUri, {
        requests: [
          {
            image: { content: base64 },
            features: [{ type: 'LABEL_DETECTION', maxResults: 10 }],
          },
        ],
      });
      const labels = response.data.responses[0].labelAnnotations.map(
        (label) => label.description.toLowerCase()
      );
      onSearch(labels);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error processing the image.');
    }
  };

  const toBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleImageSelection = async (pickerResult) => {
    if (pickerResult.cancelled) {
      console.log('User cancelled image picker');
    } else {
      const { uri } = pickerResult;
      setImageUri(uri);
      processImage(uri);
    }
  };

  const selectImageFromLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true });
    handleImageSelection(pickerResult);
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({ base64: true });
    handleImageSelection(pickerResult);
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={selectImageFromLibrary} />
      <Button title="Take Photo" onPress={takePhoto} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default PhotoSearch;
