import React, { Component } from 'react'
import { View,Text, TextInput,StyleSheet,Image,ScrollView,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Button from  'react-native-button';

const{width,scale} =Dimensions.get('window');
const s=width / 640;
export default class User extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                <View style={styles.vie1}>
                    <View style={styles.vie2}>
                        <Icon size={35*s} name='search1' style={{paddingLeft:10*s}}/>
                        <TextInput style={{paddingLeft:30*s,width:'60%',fontSize:20*s}} 
                            placeholder='请输入您要搜索的关键字'
                            placeholderTextColor='#fff'
                        />
                    </View>
                    <Icon size={35*s}  style={{paddingLeft:20*s}} name='shoppingcart'/>
                </View>
                <View>
                    <Image source={require('../images/top.png')} style={{height:300*s,width:"100%"}}/>
                </View>
                <View  flexDirection='column'>
                    <View style={[styles.vie,{marginTop:10*s}]}>
                        <Image style={styles.img}  source={require('../images/服务1.png')}/>
                        <Text style={[styles.text,{marginRight:230*s}]}>居家维修保养</Text>
                        <Icon size={30*s} color="#cecece" name='right'/>
                    </View>
                    <View style={styles.vie}>
                        <Image style={styles.img}  source={require('../images/服务2.gif')}/>
                        <Text style={styles.text}>住宿优惠</Text>
                        <Icon size={30*s} color="#cecece" name='right'/>
                    </View>
                    <View style={styles.vie}>
                        <Image style={styles.img}  source={require('../images/服务3.gif')}/>
                        <Text style={styles.text}>出行接送</Text>
                        <Icon size={30*s} color="#cecece" name='right'/>
                    </View>
                    <View style={styles.vie}>
                        <Image style={styles.img}  source={require('../images/服务4.gif')}/>
                        <Text style={[styles.text,{marginRight:285*s}]}>E族活动</Text>
                        <Icon size={30*s} color="#cecece" name='right'/>
                    </View>   
                </View>
                <View style={styles.btn}>
                    <Button style={{color:"#fff",fontSize:20*s,marginTop:10*s}}
                    >发布需求</Button>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles =StyleSheet.create({
    text:{
        fontSize:25*s,
        color:'#5d5d5d',
        marginLeft:80*s,
        marginRight:280*s,
    },
    vie:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        marginBottom:5*s,
        marginTop:5*s,
        height:120*s
    },
    btn:{
        marginLeft:110*s,
        marginTop:30*s,
        marginBottom:100*s,
        width:400*s,
        height:50*s,
        backgroundColor:'red',
        borderRadius:10*s
    },
    vie1:{
        height:100*s,
        width:'100%',
        backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    vie2:{
        flexDirection:'row',
        alignItems:'center',
        height:'60%',
        width:'80%',
        backgroundColor:'#fbb8b8',
        borderRadius:30*s
    },
    img:{
        height:100*s,
        width:100*s,
        marginLeft:20*s
    }
})



