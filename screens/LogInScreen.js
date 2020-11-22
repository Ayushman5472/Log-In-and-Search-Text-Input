import * as React from 'react'
import {Text, StyleSheet, TouchableOpacity, View, TextInput} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class LogInScreen extends React.Component{
    constructor(){
        super()
        this.setState({
        EmailID: "",
        Password:""
        })
        
    }
    render(){

        return(
            
        <View>
            <TextInput placeholder="EmailID" keyboardType="email-address" onChangeText={text=>{
                this.setState({
                    EmailID:text
                })
            }
            }/>
        
          

            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={text=>{
                this.setState({
                    Password:text
                })
            }}/>
            <TouchableOpacity onPress={this.logIn(this.state.EmailID, this.state.Password)}><Text>Submit</Text></TouchableOpacity>

            </View>
        )

    }
}
