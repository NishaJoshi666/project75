import React from 'react';
import { StyleSheet, Text, View , TextInput, TouchableOpacity , FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import db from '../config';

export default class ReadStoryScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: '',
            DataSource:[],
            lastVisibleStories:null,
        };
    }

    fetchMoreStories = async ()=>{
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")
  
        
        if (enteredText[0].toUpperCase() ==='L'){
        const query = await db.collection("Story").where('StoryTitle','==',text).startAfter(this.state.lastVisibleStories).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            DataSource: [...this.state.DataSource, doc.data()],
            lastVisibleStories: doc
          })
        })
      }
        else if(enteredText[0].toUpperCase() === 'S'){
          const query = await db.collection("Story").where('StoryAuthor','==',text).startAfter(this.state.lastVisibleStories).limit(10).get()
          query.docs.map((doc)=>{
            this.setState({
              DataSource: [...this.state.DataSource, doc.data()],
              lastVisibleStories: doc
            })
          })
        }
    }

    searchFilterFunction = async(text)=>{
        var enteredText = text.split('')
        var text = text.toUpperCase()
        if(enteredText[0].toUpperCase()==='L'){
            const storySearch = await db.collection('Story').where('StoryTitle','==',text).get();
            storySearch.docs.map((doc)=>{
                this.setState({
                    DataSource:[...this.state.DataSource,doc.data()],
                    lastVisibleStories:doc
                })
            })
        }
        else if(enteredText[0].toUpperCase()==='S'){
            const storySearch = await db.collection('Story').where('StoryAuthor','==',text).get();
            storySearch.docs.map((doc)=>{
                this.setState({
                    DataSource:[...this.state.DataSource,doc.data()],
                    lastVisibleStories:doc
                })
            })
        }
    }
    

    componentDidMount = async()=>{
        const AllStories = await db.collection('Story').limit(10).get();
        AllStories.docs.map((doc)=>{
            this.setState({
                DataSource:[],
                lastVisibleStories:doc
            })
        })
    }

    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput 
                    style ={styles.bar}
                    placeholder = "Enter Story or Author Name"
                    onChangeText={(text)=>{this.setState({search:text})}}/>
                    <TouchableOpacity
                    style = {styles.searchButton}
                    onPress={()=>{this.searchFilterFunction(this.state.search)}}
                    >
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                data={this.state.DataSource}
                renderItem={({item})=>(
                <View style={{borderBottomWidth: 2}}>
                    <Text>{"Story: " + item.StoryTitle}</Text>
                    <Text>{"Author: " + item.StoryAuthor}</Text>
                    <Text>{"Date: " + item.date.toDate()}</Text>
                </View>
                )}
                keyExtractor= {(item, index)=> index.toString()}
                onEndReached ={this.fetchMoreStories}
                onEndReachedThreshold={0.7}
                /> 
            </View>
        )
    }
        
    
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        marginTop: 20 
    }, 
    searchBar:{ 
        flexDirection:'row', 
        height:40, 
        width:'auto', 
        borderWidth:0.5, 
        alignItems:'center', 
        backgroundColor:'grey', 
    }, 
    bar:{ 
        borderWidth:2, 
        height:30, 
        width:300, 
        paddingLeft:10, 
    }, 
    searchButton:{ 
        borderWidth:1, 
        height:30, 
        width:50, 
        alignItems:'center', 
        justifyContent:'center', 
        backgroundColor:'green' 
    } 
})