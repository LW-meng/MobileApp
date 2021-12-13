
import React from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import Footer from './Footer'

// const App = () => {...}
export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flex:2, alignItems:'center'}}>
          <Text style={styles.header}>
            About
          </Text>
      </View>

      <View style={{flex:8}}>
        <View style={styles.horizontal}>
          <Image
             style={{width:"50%",}}
             source={{uri:'https://cdn.vox-cdn.com/thumbor/iIfRSJyh0fXltjriyTKKrcVsBEo=/0x0:2098x1186/2120x1413/filters:focal(879x398:1213x732):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69716218/Screen_Shot_2021_08_12_at_12.09.59_PM.0.png'}}/>
          <View>
            <Text style={{fontSize:24, flexWrap:'wrap'}}>
              This is about page which will introduce you about our app.
            </Text>
          </View>
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
    alignItems: 'stretch',
    //justifyContent: 'stretch',
  },
  header: {
    flex:1,
    alignItems:'center',
    fontSize:64,
    padding:25,
    color:"skyblue",
  },
  horizontal: {
    flex:1,
    flexDirection:'row',
    alignItems: 'stretch',
    //justifyContent: 'stretch',
  },
});
