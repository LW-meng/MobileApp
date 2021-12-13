import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const PlanFormScreen = ({navigation, route}) =>{
  //const [name, setName] = useState(route.params.n)
  const [name, setName] = useState(route.params.n)
  const [startTime, setStartTime] = useState("7 pm")
  const [endTime, setEndTime] = useState("8 pm")
  const [workout1, setWorkOut1] = useState("Squat")
  const [debugging,setDebugging] = useState(false)
  const [curID, setCurID] = useState(0)
  const [curRecords, setCurRecords] = useState([])

  //useEffect(() => {getData();}, []);
  const getData = async () => {
    try {
      // the '@profile_info' can be any string
      const jsonValue = await AsyncStorage.getItem("user")
      let data = null
      if (jsonValue != null) {
        data = JSON.parse(jsonValue)
        // setName(data.name)
        // setStartTime(data.startTime)
        // setEndTime(data.endTime)
        // setWorkOut1(data.workout1)
        setCurRecords(data.records)
        setCurID(data.id)
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
      let input = {records: curRecords, id: curID};
      const jsonValue = JSON.stringify(input);
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
      setCurRecords([]);
      console.log("in clearData");
      await AsyncStorage.clear();
    } catch (e) {
      console.log("error in clearData ");
      console.dir(e);
      // clear error
    }
  };
  useEffect(() => {getData();}, []);
  const addPost = () =>{
    let post =
      {id: curID, name: name, startTime: startTime, endTime: endTime, workout1: workout1};
    let temp = [];
    if (curRecords.length == 0) {
      temp = [post];
    } else {
      temp = curRecords;
      temp.push(post);
    }
    setCurRecords(temp)
    setCurID(curID+1)
    setName("Wei")
    setStartTime("7pm")
    setEndTime("8 pm")
    setWorkOut1("Squat")
    console.log(post)
    storeData(temp)
  }
  //useEffect(() => {getData();}, []);

  let debugView = ""
  if (debugging) {
    debugView =
      <View>
          <Text> start: {startTime} </Text>
          <Text> end: {endTime} </Text>
          <Text> work item: {workout1} </Text>
          <Text> name: {name} </Text>
      </View>
  }

  const Item = ({ item }) => {
    return (
      <View style={{ padding: 10, margin: 10, backgroundColor: "#ddd" }}>
        {console.log(item)}
        <Text style={{ fontSize: 24 }}>{item.name}</Text>
        <Text>{item.workout1}  {item.startTime}-{item.endTime}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Hi {name}, please fill up today's work out plan!</Text>
      <View style={styles.inputLine}>
        <Text>Start Time: </Text>
        <TextInput
          //style={styles.textinput}
          //ref={myTextInput}
          placeholder={startTime}
          onChangeText={text => {
            setStartTime(text);
          }}
        />
      </View>
      <View style={styles.inputLine}>
        <Text>End Time: </Text>
        <TextInput
          //style={styles.textinput}
          //ref={myTextInput}
          placeholder={endTime}
          onChangeText={text => {
            setEndTime(text);
          }}
        />
      </View>
      <View style={styles.inputLine}>
        <Text>Work item: </Text>
        <TextInput
          //style={styles.textinput}
          //ref={myTextInput}
          placeholder={workout1}
          onChangeText={text => {
            setWorkOut1(text);
          }}
        />
      </View>
      <View style={styles.fixToText}>
        <Button
          color='blue'
          title='submit'
          onPress = {() => {
            addPost()
            // const theInfo = {id: curID, name: name, startTime: startTime, endTime: endTime, workout1: workout1}
            // console.log(`theInfo=${theInfo}`)
            // console.log('data='+JSON.stringify(theInfo))
            // storeData(theInfo)
            navigation.navigate('Plan', {n: name})
          }}
        />
        <Button
          color='red'
          title='clear'
          onPress = {() => {
            clearAll()
          }}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
    //alignItems: "left",
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
    //alignItems: "center",
  },
  fixToText: {
    flexDirection: "row",
    //justifyContent: "space-between",
  },
});

export default PlanFormScreen
