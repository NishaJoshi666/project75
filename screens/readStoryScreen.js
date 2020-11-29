import React from 'react';
import { Text, View, TouchableOpacity,TextInput,StyleSheet, FlatList } from 'react-native';
import firebase from 'firebase';
import db from './config';

export default class readStoryScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allTransaction:[],
      lastVisibalTransation:null,

    }

  }
  componentDidMount=async()=>{
    const query = await db.collection('transation').get()
    query.docs.map(doc=>{
      this.setState({
        allTransaction:[...this.state.allTransaction,doc.data()]
      })
    })
  }
  fetchmoreTransation=()=>{
    const query=await db.collection('transtion').startAfter(this.state.lastTransaction)
    .limit(10).get()
    query.docs.map(doc=>{
      this.setState({
        allTransaction:[...this.state.allTransaction,doc.data()],
        lastVisibalTransation:doc
      })
    })
  }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FlatList 
          data={this.state.allTransaction}
          renderItem={item=>{
            <View style={{borderBottomWidth:2}}>
              <Text>{'BookID'+item.bookId}</Text>
          <Text>{'StudentID'+item.studentID}</Text>
          <Text>{'transactionType'+item.transactionType}</Text>
          <Text>{'date'+item.date.toDate()}</Text>
            </View>
          }}
          keyExtractor={(item,Index)=>{
            Index.toString()
          }}
          onEndReached={this.fetchmoreTransation}
          onEndReachedThreshold={0.7}/>
          <TextInput 
          placeholder={'EnterBookID OR EnterStudentID'}/>
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.displayText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    displayText: {
      fontSize: 15,
      textDecorationLine: "underline"
    },
    scanButton: {
      backgroundColor: "#2196F3",
      padding: 10,
      margin: 10
    },
    buttonText: {
      fontSize: 15,
      textAlign: "center",
      marginTop: 10
    },
    inputView: {
      flexDirection: "row",
      margin: 20
    },
    inputBox: {
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton: {
      backgroundColor: "#66BB6A",
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton: {
      backgroundColor: "#FBC02D",
      width: 100,
      height: 50
    },
    submitButtonText: {
      padding: 10,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      color: "white"
    },
    transactionAlert: {
      margin: 10,
      color: "red"
    }
  });
  