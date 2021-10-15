import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const PlanScreen = ({navigation}) =>{
  const [name, setName] = useState()
  const [startTime, setStartTime] = useState("7 pm")
  const [endTime, setEndTime] = useState("8 pm")
  const [workout1, setWorkOut1] = useState("Squat")
  const [debugging,setDebugging] = useState(false);
  useEffect(() => {getData();}, []);
  const getData = async () => {
    try {
      // the '@profile_info' can be any string
      const jsonValue = await AsyncStorage.getItem("user")
      let data = null
      if (jsonValue != null) {
        data = JSON.parse(jsonValue)
        setName(data.name)
        setStartTime(data.startTime)
        setEndTime(data.endTime)
        setWorkOut1(data.workout1)
        console.log("just set Info, Name and Email")
      } else {
        console.log("just read a null value from Storage")
        // this happens the first time the app is loaded
        // as there is nothing in storage...
      }
    } catch (e) {
      console.log("error in getData ")
      // this shouldn't happen, but its good practice
      // to check for errors!
      console.dir(e)
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
      console.log("just stored " + jsonValue);
    } catch (e) {
      console.log("error in storeData ");
      console.dir(e);
      // saving error
    }
  };

  const clearAll = async () => {
    try {
      console.log("in clearData");
      await AsyncStorage.clear();
    } catch (e) {
      console.log("error in clearData ");
      console.dir(e);
      // clear error
    }
  };



  let debugView = ""
  if (debugging) {
    debugView =
      <View>
          <Text> start: {startTime} </Text>
          <Text> end: {endTime} </Text>
          <Text> work item: {workout1} </Text>
      </View>
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}> Hey {name}, here is your work out plan today!</Text>
      <View style={styles.inputLine}>
        <Text>Start Time: {startTime}</Text>
      </View>
      <View style={styles.inputLine}>
        <Text>End Time: {endTime}</Text>
      </View>
      <View style={styles.inputLine}>
        <Text>Work item: {workout1}</Text>
      </View>
      <View style={styles.fixToText}>
        <Button
          color='red'
          title='Edit'
          onPress = {() => {
            navigation.navigate("PlanForm", {n:name})
          }}
        />
      </View>
      <View style={styles.fixToText}>
        <Button
          title={(debugging?'hide':'show')+" debug info" }
          color="green"
          onPress = {() => setDebugging(!debugging)}
          />
      </View>
      {debugView}
    </View>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "left",
    margin: "20px",
    padding: "20px",
  },
  textinput: {
    margin: 20,
    fontSize: 30,
  },
  inputLine: {
    flexDirection: "row",
  },
  correctview: {
    fontSize: 25,
    color: "red",
  },
  header: {
    fontSize: 40,
    color: "blue",
  },
  second_header: {
    fontSize: 30,
    color: "black",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PlanScreen;
