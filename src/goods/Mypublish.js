import React, { Component } from 'react'
import { Text, View, ScrollView,StyleSheet,ToastAndroid} from 'react-native'
import Button from 'react-native-button';
import {Dimensions} from 'react-native';
const{width,scale} =Dimensions.get('window');
const s=width / 640;

 
export default class Mypublish extends Component {
    constructor(){
        super()
        this.state=({
            tits:[],
            num:1
        })
    }
    //跳转下一页
    nextpage=()=>{
        if(this.state.num>=0){
            this.setState({
                num:this.state.num+1
            })
        }
    }
    //跳转上一页
    uppage=()=>{
        if(this.state.num>1){
            this.setState({
                num:this.state.num-1
            })
        }else{
            //弹框
            ToastAndroid.show("上边没有了!", ToastAndroid.SHORT);
        }
    }
    componentDidMount(){
        let page =this.state.num;
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+page)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({tits: res.data});
            })
    }
    componentDidUpdate(){
        let page =this.state.num;
        fetch('https://cnodejs.org/api/v1/topics?limit=10&page='+page)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({tits: res.data});
            })
    }
    render() {
        return (
            <View style={{backgroundColor:'#fff'}}>
                <ScrollView> 
                {
                    this.state.tits.map((item)=>(
                        <View
                        flexDirection='row'
                        justifyContent='space-between'
                        >
                            <Text  style={[styles.te,{width:250*s}]}>{item.title.length>15?item.title.substr(0, 15) + "..." : item.title}</Text>
                            <Text style={styles.te}>{item.create_at.substr(0, 10)}</Text>
                            <View style={styles.te}>{item.title.length%2==1?<Text>已下载</Text>:<Text style={{color:'red'}}>待下载</Text>}</View>
                        </View>
                    ))
                }
                <View 
                    flexDirection='row'
                    justifyContent='space-around'
                >
                    <Button style={styles.bt} onPress={()=>{this.uppage()}}>上一页</Button>
                    <Text style={{fontSize:20*s,marginTop:45*s}}>第{this.state.num}页</Text>
                    <Button style={styles.bt} onPress={()=>{this.nextpage()}}>下一页</Button>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles =StyleSheet.create({
    bt:{
        width:150*s,
        height:40*s,
        borderWidth:1,
        backgroundColor:'red',
        color:'#fff',
        fontSize:20*s,
        paddingTop:5*s,
        marginTop:40*s,
        marginBottom:40*s,
        borderRadius:30*s
    },
    te:{
        paddingTop:20*s,
        fontSize:15*s,
        marginLeft:10*s,
        marginRight:10*s
    }
})
