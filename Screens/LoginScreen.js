import * as React from 'react'
import {Text ,View , StyleSheet , TextInput , TouchableOpacity , Alert, KeyboardAvoidingView , Image} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            password:'',
            emailId :''
        }
    }

    login = async(emailId,password)=>{
        if(emailId && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(emailId,password)
                if(response){
                    this.props.navigation.navigate('writeStory')
                } 
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':Alert.alert('User doesnot exist')
                    break;
                    case 'auth/invalid-email':Alert.alert('incorrect email or password')
                    break;
                }
            }
        }
        else{
            Alert.alert('enter your email Id or password')
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:'center' , marginTop:50}}>
            <View>
            <Image
                source={require("../assets/read.png")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Stories</Text>
            </View>
            <View>
                <TextInput style = {Styles.loginBox} placeholder = 'abc@gmail.com' keyboardType = 'email-address' onChangeText = {(text)=>{
                    this.setState({
                        emailId:text
                    })
                }}/>

                <TextInput style = {Styles.loginBox} placeholder = 'enter your password' secureTextEntry = {true} onChangeText = {(text)=>{
                    this.setState({
                        password:text
                    })
                }}/>

            </View>
            <View>
                <TouchableOpacity style = {Styles.submitButton} onPress = {()=>{
                    this.login(this.state.emailId , this.state.password)
                }}>
                    <Text style = {{textAlign:'center',fontSize:20}}>SUBMIT</Text>
                </TouchableOpacity>    
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const Styles = StyleSheet.create({
    loginBox:
    {
      width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin:10,
    paddingLeft:10
    },
    submitButton:{height:40,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7,backgroundColor:'red'}
  })