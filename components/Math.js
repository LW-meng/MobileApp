import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const MathQuiz = (props) =>{
  const [num, setNum] = useState(props.n);
  const [input, setInput] = useState('')
  const [firstNum, setFirstNum] = useState(Math.floor(Math.random()* (num+1)));
  const [secondNum, setSecondNum] = useState(Math.floor(Math.random()* (num+1)));
  const [correctNum, setCorrectNum] = useState(0);
  const [answeredNum, setAnsweredNum] = useState(0);
  const [correctPercent, setCorretPercent] = useState(0.0);
  const [checkYet, setCheckYet] = useState(false)
  const [result, setResult] = useState("waiting")

  const [feedback, setFeedback] = useState(false);
  const [debugging,setDebugging] = useState(false);
  let myTextInput = React.createRef();



  let feedbackView = ""
  if (feedback && checkYet) {
    feedbackView =
    <View style={{width: "30%"}}>
      <Text style={{color:"red", fontSize:25}}>
        Sorry, the answer is {firstNum*secondNum}, try again!
      </Text>
      <View style={{ alignSelf: "center" }}>
          <Button
            color='green'
            title='next question'
            onPress = {() => {
              setFirstNum(Math.floor(Math.random()* (num+1)));
              setSecondNum(Math.floor(Math.random()* (num+1)));
              setCheckYet(false);
              setFeedback(false);
              setResult('waiting');
              setInput('');
              myTextInput.current.clear();

              console.log("saving progress");
              //const theInfo = {firstNum:firstNum,secondNum:secondNum, input:input, correctNum: correctNum, answeredNum: answeredNum, feedback: feedback, checkYet:checkYet, correctPercent: correctPercent, debugging: debugging, result:result}
              const theInfo = {correctNum: correctNum, answeredNum: answeredNum, correctPercent: correctPercent}
              console.log(`theInfo=${theInfo}`)
              console.log('data='+JSON.stringify(theInfo))
              storeData(theInfo)
            }}
          />
      </View>
    </View>
  }else if(!feedback && checkYet) {
    feedbackView =
    <View>
      <Text style={{color:"red", fontSize:25}}>
        Correct!!
      </Text>
      <View style={styles.fixToText}>
          <Button
            color='green'
            title='next question'
            onPress = {() => {
              setFirstNum(Math.floor(Math.random()* (num+1)));
              setSecondNum(Math.floor(Math.random()* (num+1)));
              setCheckYet(false);
              setFeedback(false);
              setResult('waiting');
              setInput('');
              myTextInput.current.clear();

              console.log("saving progress");
              //const theInfo = {firstNum:firstNum,secondNum:secondNum, input:input, correctNum: correctNum, answeredNum: answeredNum, feedback: feedback, checkYet:checkYet, correctPercent: correctPercent, debugging: debugging, result:result}
              const theInfo = {correctNum: correctNum, answeredNum: answeredNum, correctPercent: correctPercent}
              console.log(`theInfo=${theInfo}`)
              console.log('data='+JSON.stringify(theInfo))
              storeData(theInfo)
            }}
          />
      </View>
    </View>
  }

  let checkButton = ""
  if(!checkYet){
    checkButton =
    <View style={styles.fixToText}>
      <Button
        color='red'
        title='check answer'
        onPress = {() => {
          let curCorret = correctNum;

          if (input !== firstNum*secondNum){
            setFeedback(true);

          }else{
            curCorret += correctNum+1;
            setCorrectNum(curCorret);
            setResult('corret');
          }
          //setFirstNum(Math.floor(Math.random()* (num+1)));
          //setSecondNum(Math.floor(Math.random()* (num+1)));
          let curAnswered = answeredNum+1;
          setAnsweredNum(curAnswered);
          setCheckYet(true);

          console.log("saving progress");
          //const theInfo = {firstNum:firstNum,secondNum:secondNum, input:input, correctNum: correctNum, answeredNum: answeredNum, feedback: feedback, checkYet:checkYet, correctPercent: correctPercent, debugging: debugging, result:result}
          const theInfo = {correctNum: curCorret, answeredNum: curAnswered, correctPercent: correctPercent}
          console.log(`theInfo=${theInfo}`)
          console.log('data='+JSON.stringify(theInfo))
          storeData(theInfo)
        }}
      />
      </View>
  }

  let nextButton = ""


  let percentView = ""
  if(answeredNum == 0){
    percentView = <Text>Percent Corret: 0</Text>
  }else{
    percentView = <Text>Percent Corret: {(correctNum/answeredNum*100).toFixed(1)}</Text>
  }

  let debugView = ""
  if (debugging) {
    debugView =
      <View>
          <Text> x: {firstNum} </Text>
          <Text> y: {secondNum} </Text>
          <Text> answer: {input} </Text>
          <Text> correct: {correctNum} </Text>
          <Text> answered: {answeredNum} </Text>
          <Text> result: {result} </Text>
      </View>
  }




  // when the component is loaded it gets the data from storage
  // and updatges the info, name, and email fields
  // but this is the only time useEffect is called
  useEffect(() => {getData()}
           ,[])

  // getData uses AsyncStorage to access the stored profile info as a string
  // then it uses JSON.parse to turn that string to a JSON object
  // finally it uses the set functions for the useState hook to set the
  // info, email, and name state variables.
  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@profile_info')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            //setFirstNum(data.firstNum)
            //setSecondNum(data.secondNum)
            //setInput(data.input)
            setCorrectNum(data.correctNum)
            setAnsweredNum(data.answeredNum)
            //setFeedback(data.feedback)
            //setCheckYet(data.checkYet)
            setCorretPercent(data.correctPercent)
            //setDebugging(data.debugging)
            //setResult(data.result)
            console.log('just set Info, Name and Email')
          } else {
            console.log('just read a null value from Storage')
            // setInfo({})
            // setName("")
            // setEmail("")
          }


        } catch(e) {
          console.log("error in getData ")
          console.dir(e)
          // error reading value
        }
  }

  // storeData converts the value stored in the info variable to a string
  // which is then writes into local storage using AsyncStorage.setItem.
  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@profile_info', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }


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


  return(
    <View style={styles.container}>
      <Text style={styles.firstHeader}>Math Quiz for numbers between 0 and {props.n}</Text>
      <Text style={styles.secondHeader}>
        Calculate the product of the following two numbers:
      </Text>
      <Text style={styles.secondHeader}>
        {firstNum} * {secondNum} =
        <TextInput
            style={styles.textinput}
            ref={myTextInput}
            placeholder='???'
            onChangeText={text => {setInput(parseInt(text))}}
        />
      </Text>

      {feedbackView}
      {checkButton}

      <Text>Correct: {correctNum}</Text>
      <Text>Answered: {answeredNum}</Text>
      {percentView}

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
};

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'left',
      //justifyContent: 'center',
      //border: "thick solid red",
      margin:"20px",
      padding:"20px",
    },
    textinput:{
      margin:20,
      fontSize:20
    },
    firstHeader: {
      fontSize:50,
      color:'blue'
    },
    secondHeader: {
      fontSize:30,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  export default MathQuiz;
