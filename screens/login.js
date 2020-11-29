import * as React from 'react';
import {View, StyleSheet,Text,TextInput,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';


export default class Login extends React.Component{
  constructor(){
    super(
      this.state={
        emailId:'',
        password:"",
      }
    )
  }

  Login=async(emailId,password)=>{
    if(emailId&&password){
      try{
      const respons = await firebase.auth().signInWithEmailAndPassword(emailId,password);
      if(respons){
        this.props.navigation.navigate('Transaction')
      }
      }
      catch(error){
        alert('Error is: '+error);
      }
    }

  }

    render(){
        return(
            <view>
                <Text>loginScreen</Text>
                <TextInput style={styles.displayText}
                keyboardType='email-address'
                placeholder="Enter E-Mail address"
                onChangeText={(text)=>{
                  this.setState({
                    emailId:text
                  })
                }}>


                </TextInput>

                <TextInput style={styles.displayText}
                keyboardType='password'
                placeholder="Enter your password"
                secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({
                    password:text
                  })
                }}>


                </TextInput>
                <TouchableOpacity style={styles.scanButton} 
                onPress={()=>{
                  this.Login(this.state.emailId,this.state.password)
                }}>
                  <Text>Login</Text>
                </TouchableOpacity>
            </view>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
      backgroundColor: '#FBC02D',
      width: 100,
      height:50
    },
    submitButtonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: 'white'
    },
    transactionAlert:{
      margin:10,
      color: 'red'
    }
  });