import * as React from 'react';
import {createContext, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, Button, } from 'react-native';

import AboutScreen from './About'
import LoginScreen from './Login'
import PlanFormScreen from './PlanForm'
import PlanScreen from './Plan'

import Footer from './Footer'

const Stack = createNativeStackNavigator();
const Context = createContext("Default Value");

const MyStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={HomeScreen} options={{ title:'Welcom Wei'}}/>
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PlanForm" component={PlanFormScreen} />
        <Stack.Screen name="Plan" component={PlanScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  const value = "Wei";
  return (
      <View style={{ flexDirection: 'row',
                     margin:"25px",
                     //border:"thick solid black",
                     padding:'10px',
                     //justifyContent: 'space-around',
                   }}>


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

        <Button
          title="PlanForm"
          onPress={() =>
            navigation.navigate('PlanForm', {n: value})
          }
        />
        <Button
          title="Plan"
          onPress={() =>
            navigation.navigate('Plan')
          }
        />
    </View>
  );
};


export default MyStack;
