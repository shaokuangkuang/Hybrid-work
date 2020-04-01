import React, { Component } from 'react'
import {View, Text,ImageBackground,TextInput, TouchableOpacity, AsyncStorage,StyleSheet, ToastAndroid, Alert,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils/index'
import {Dimensions} from 'react-native'
const{width,scale} =Dimensions.get('window');
const s=width / 640;

let rootUrl='https://www.fastmock.site/mock/afe15e7a06ced2a28a4349cff024b576/HomeWork'

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            pwd:'',
            isloading:false,
            louser:'',
            lopwd:'',
            index:''
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('username')
        .then(res=>this.setState({
            louser:res
        }))

        AsyncStorage.getItem('pwd')
        .then(res=>this.setState({
            lopwd:res
        }))
        AsyncStorage.getItem('zhuce')
        .then(res=>this.setState({
            index:res
        }))
    }
    putusername=(text)=>{
        this.setState({
          username:text
        })
      }
      putpwd=(text)=>{
        this.setState({
          pwd:text
        })
      }

      
       login=()=>{
          this.setState({isloading:true})
          if(this.state.index==null){
            Alert.alert('未注册，请先注册再登陆')
            this.setState({isloading:false})
        }
        else if(this.state.username!=''&&this.state.pwd!=''){
            myFetch.post('/login',
            { username:this.state.username,
                pwd:   this.state.pwd}
            ).then(res=>{ 
               
                if(JSON.stringify(res.data.username)!=this.state.louser){//用户名为111111时
                    ToastAndroid.show("用户名错误", 1000)
                    this.setState({isloading:false})
                }else if(JSON.stringify(res.data.pwd)!=this.state.lopwd){//用户名为222222时
                    ToastAndroid.show("密码错误", 1000)
                    this.setState({isloading:false})
                }else{
                    AsyncStorage.setItem('user',JSON.stringify(res.data))
                    .then(()=>{
                        console.log('跳转')
                        Actions.首页();
                        this.setState({isloading:false})
                })} 
            })
          }else{
            ToastAndroid.show("用户名和密码不为空", 1000)
            this.setState({isloading:false})
          }
      }

    render() {
        return (
            <ImageBackground
            source={require('../images/bg2.jpg')} style={{width:'100%',height:'100%'}}
            >
            <StatusBar hidden={true} />
            <View style={{flex: 1,justifyContent: 'center'}}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize:50*s,color:'grey',marginBottom:50*s}}>HELLO</Text>
                    <View style={styles.di}>
                        <Icon name="user" color="white" size={30*s}/>
                        <TextInput 
                            placeholder="请输入用户名"
                            placeholderTextColor='#778899'
                            onChangeText={this.putusername}
                        />
                    </View>

                    <View style={styles.di}>
                        <Icon name="lock" color="white" size={30*s}/>
                        <TextInput 
                            secureTextEntry={true}
                            placeholderTextColor='#778899'
                            placeholder="请输入密码"
                            onChangeText={this.putpwd}
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.bt}
                        onPress={this.login}
                    >
                        <Text style={{color:'white',fontSize:30*s}}>登录</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.bt}
                        onPress={()=>{Actions.zhuce()}}
                    >
                        <Text style={{color:'white',fontSize:30*s}}>注册</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isloading
                    ?<View style={styles.al}><Text style={{color:"black",fontSize:25*s,alignItems:"center"}}>正在登陆中</Text></View>
                    :null
                }
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
        borderBottomWidth: 1,
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
        borderRadius:10*s,
    },
    al:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:25*s,
        marginLeft:"25%",
        position:"relative",
        top:200*s,
        width:"50%",
        height:60*s,
        backgroundColor:'rgba(178,178,178,0.5)',
    }
})
