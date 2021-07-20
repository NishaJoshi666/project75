import React from 'react';
import { StyleSheet, Text, View , Image } from 'react-native';
import WriteStoryScreen from './Screens/writeStoryScreen';
import ReadStoryScreen from './Screens/readStoryScreen';
import LoginScreen from './Screens/LoginScreen';
import {createAppContainer ,  createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component {
  render(){
    return (
      <AppContainer/>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  writeStory:WriteStoryScreen,
  ReadStory:ReadStoryScreen
},
{
defaultNavigationOptions:({navigation})=>({
  tabBarIcon:({})=>{
    const routeName = navigation.state.routeName
    if(routeName==='writeStory'){
      return(
        <Image style = {{width:45 , height:45}} source = {require('./assets/write.png')}/>
      )
    }
    else if(routeName==='ReadStory'){
      return(
        <Image  style = {{width:40 , height:40}} source = {require('./assets/read.png')}/>
      )
    }
  }
})
})
const switchNavigator = createSwitchNavigator({
  LoginScreen:LoginScreen,
  TabNavigator:TabNavigator
})

const AppContainer = createAppContainer(switchNavigator);