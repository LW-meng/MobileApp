
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

// const App = () => {...}
export default function App() {
  return (
    <View style={styles.footer}>
      <Text style={{fontSize:20}}>
      This is a really simple footer with lots of possible!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex:1,
    alignItems:'center',
    padding:15,
    color:"skyblue",
  },
});
