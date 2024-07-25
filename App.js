// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BirdListScreen from './src/screens/BirdListScreen';
import BirdDetailScreen from './src/screens/BirdDetailScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BirdList">
        <Stack.Screen name="BirdList" component={BirdListScreen} options={{ title: 'Bird Book' }} />
        <Stack.Screen name="BirdDetail" component={BirdDetailScreen} options={{ title: 'Bird Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
