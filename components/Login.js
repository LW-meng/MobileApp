
import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import Footer from './Footer'

// const App = () => {...}
export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flex:2, alignItems:'center'}}>
          <Text style={styles.header}>
              Log in
          </Text>
      </View>

      <View style={{flex:8}}>
        <View style={styles.formBox}>
          <TextInput style={styles.input} placeholder="Username"/>
          <TextInput style={styles.input} placeholder="Password"/>
          <Button title="Log in" color="skyblue"/>
        </View>
      </View>

      <View>
        <Footer/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'stretch',
    //justifyContent: 'stretch',
  },
  header: {
    flex:1,
    alignItems:'center',
    fontSize:64,
    padding:25,
    color:"skyblue",
  },
  input:{
    color: 'black',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  formBox:{
    flex:1,
    flexDirection:'column',
  },
});
