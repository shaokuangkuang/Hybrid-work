import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, AsyncStorage,StyleSheet, ToastAndroid,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux';
import {Dimensions} from 'react-native'
import {myFetch} from '../utils/index'


const{width,scale} =Dimensions.get('window');
const s=width / 640;
export default class Registered extends Component {
    constructor(){
        super();
        this.state={
            isloading:false,
            username:'',
            pwd1:'',
            pwd2:''
        }
    }

    putusername=(text)=>{
        this.setState({
          username:text
        })
        AsyncStorage.setItem('username1',text)
      }
      putpwd1=(text)=>{
        this.setState({
          pwd1:text
        })
      }
      putpwd2=(text)=>{
        this.setState({
          pwd2:text
        })
      }

    login=()=>{
        if(this.state.username!=''&&this.state.pwd1!=''){
          myFetch.post('/login2',
          { username:this.state.username,
              pwd:   this.state.pwd1}
          ).then(res=>{
                //先注册，后登录
                if(this.state.pwd1===this.state.pwd2&&this.state.pwd1!=''){
                    AsyncStorage.setItem('username',JSON.stringify(res.data.username))
                    AsyncStorage.setItem('pwd',JSON.stringify(res.data.pwd))
                    AsyncStorage.setItem('zhuce','true')
                    Actions.login()
                }else{
                    this.setState({
                    isloading:true
                })
            }
          })
        }else{
          ToastAndroid.show("输入项不为空", 1000)
        }
    }


    render() {
        return (
            <ImageBackground
            source={require('../images/bg2.jpg')} style={{width:'100%',height:'100%'}}
            >
            <View style={{flex: 1,justifyContent: 'center'}}>
                <View style={{ alignItems: 'center'}}>
                    <View style={styles.di}>
                        <Icon name="user" color="white" size={40*s}/>
                        <TextInput 
                            placeholderTextColor='#778899'
                            placeholder="请输入用户名"
                            onChangeText={this.putusername}
                        />
                    </View>

                    <View style={styles.di}>
                        <Icon name="lock" color="white" size={40*s}/>
                        <TextInput 
                            secureTextEntry={true}
                            placeholderTextColor='#778899'
                            placeholder="请输入密码"
                            onChangeText={this.putpwd1}
                        />
                    </View>
                    <View style={styles.di}>
                        <Icon name="lock" color="white" size={40*s}/>
                        <TextInput 
                            secureTextEntry={true}
                            placeholderTextColor='#778899'
                            placeholder="请再次输入密码"
                            onChangeText={this.putpwd2}
                        />
                        {
                            this.state.isloading
                            ?ToastAndroid.show("两次输入的密码不一样", 1000)
                            :null
                        }
                    </View>
                    <TouchableOpacity 
                        style={styles.bt}
                        onPress={this.login}
                    >
                        <Text style={{color:'white',fontSize:30*s}}>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:10*s}} onPress={()=>Actions.login()}><Text style={{color:'#F8F8FF',fontSize:20*s}}>已有账号，点击此处直接登录</Text></TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    di:{
        width: '80%',
        marginRight: 10*s,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1*s,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20*s,
    },
    bt:{
        width: '80%',
        height: 60*s,
        marginTop: 30*s,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(178,178,178,0.5)',
        borderRadius:10*s
    },
})