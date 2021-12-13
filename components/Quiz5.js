import React, { useState, useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Axios from "axios";


const Tab = createBottomTabNavigator();
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "bb1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "bb2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "bb3",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "bb4",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "bb3",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "bb3",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "bb3",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "bb3",
  },
];

const CONTENT = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "bb1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "bb2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "bb3",
  },

];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item}</Text>
  </TouchableOpacity>
);

const Content = ({ title, content }) => (
  <View style={{flexDirection:"row"}}>
  <View style={styles.item2}>
    <Text style={{fontSize:17}}>{title}</Text>
    <Text style={{fontSize:12}}>{content}</Text>
  </View>
  </View>
);

const Quiz5 = () => {
  const [serverURL, setURL] = useState(
  "https://glacial-hamlet-05511.herokuapp.com"
  );
  const [selectedBboard, setSelectedBboard] = useState("");
  const [bboard,setBboard] = useState("");
  const [posts, setPosts] = useState([]);
  const [numNewPosts,setNumNewPosts] = useState(0)
  const [bName, setBName] = useState([])

  useEffect(() => {
    const getbName = async () => {
      let result = [];
      result = await Axios.get(serverURL + "/bboardNames");
      console.log(result.data);
      setBName(result.data);
    };
    const bn = getbName();
  }, [bboard, numNewPosts]
  );

  const getPosts = async (itemName) => {
    setSelectedBboard(itemName);
    let result = [];
    result = await Axios.post(serverURL + "/posts", {
      bboard: itemName,
    });
    setPosts(result.data);
  };

  const clear = () => {
    setSelectedBboard("");
    setPosts([]);
  };


  const renderItem = ({ item }) => {
    const backgroundColor = "black";
    const color ='red';
  return (
    <Item
      item={item}
      onPress={() => getPosts(item)}
      backgroundColor={{ backgroundColor }}
      textColor={{ color }}
    />
  );
};

  const renderContent = ({ item }) => (
    <Content
      title={item.title}
      content = {item.text}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{flex: 6}}>
        <View style={styles.titleBlock}>
          <Text style={{color:"red",fontSize:50, marginVertical: 15,}}> BBviewer</Text>
        </View>
        <View style={styles.buttomLine}>
          <Button
            title="REFRESH BBOARDS"
            color="blue"
            onPress={() => clear()}
          />
          <SafeAreaView style={styles.test}>
            <FlatList
              data={bName}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              horizontal = {true}
            />
          </SafeAreaView>
        </View>
        <View >
          <Text style={{fontSize:28}}>
            Selected bboard:
            <Text style={{backgroundColor: "black", color: "red"}}>{selectedBboard}</Text>
          </Text>
        </View>
        <View>
          <SafeAreaView>
            <FlatList
              data={posts}
              renderItem={renderContent}
              keyExtractor={(item) => item._id}
            />
          </SafeAreaView>
        </View>
      </View>
        <View >
          <Text>DEBUGGING</Text>
          <Text>bb: {selectedBboard}</Text>
          <Text>
            show:{selectedBboard == "" && "false"}
            {selectedBboard != "" && "true"}
          </Text>
          <Text>bbs.length : {bName.length}</Text>
          <Text>posts : {JSON.stringify(posts)}</Text>
        </View>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex:6,
    flexDirection: "column",
  },
  titleBlock: {
    //flex: 2,
    backgroundColor: "black",
    //alignItems: "left",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttomLine: {
    //lex: 0.5,
    flexDirection:"row"
  },
  item: {
    padding: 6,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 15,
  },
  test: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item2: {
    backgroundColor: "lightgrey",
    //justifyContent: "space-around",
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 15,
    //flexDirection: "column"
  },
  title2: {
    fontSize: 15,
    backgroundColor: "lightgrey",
    padding: 6,
    marginVertical: 18,
    marginHorizontal: 18,
  },
  test2: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

});

export default Quiz5
