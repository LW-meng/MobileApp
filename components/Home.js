import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, Button, } from 'react-native';

import AboutScreen from './About'
import LoginScreen from './Login'

import Footer from './Footer'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome Home' }}/>
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  return (
      <View style={{ flexDirection: 'row',
                     margin:"25px",
                     //border:"thick solid black",
                     padding:'10px',
                     justifyContent: 'space-around', }}>


        <Button
          title="Log in"
          onPress={() =>
            navigation.navigate('Login')
               // we're passing a parameter name:'Jane' to the Profile component!
          }
        />

        <Button
          title="About"
          onPress={() =>
            navigation.navigate('About')
          }
        />

    </View>

  );
};


export default MyStack;
