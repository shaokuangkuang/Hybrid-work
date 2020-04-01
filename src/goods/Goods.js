import React, { Component } from 'react'
import { View,Text,Image,StyleSheet,ScrollView,Dimensions,TouchableOpacity,AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
import Mypublish from './Mypublish';

const{width,scale} =Dimensions.get('window');
const s=width / 640;
const options = {
    title: '选择来源',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册图片',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class Good extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:require('../images/head.png')
        }
    }
    //获得本地存储的uri
    componentDidMount(){
        AsyncStorage.getItem('im')
        .then(res=>{
            this.setState({
                imageUrl: { uri: res }
              })
        }   
        )
    }
    //takephoto以及本地存储
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
              const source = { uri: response.uri };
              AsyncStorage.setItem('im',response.uri)
              this.setState({
                imageUrl: source
              });
            }
          });
      }
      quit=()=>{
        AsyncStorage.removeItem('user',(error)=>{
            if (error) {
            }else {
                Actions.popTo("login");
            }
        })
    }

    render() {
        return (
            <View>
                <ScrollView>
                <View
                    alignItems='center'
                    style={{backgroundColor:'#f23030',paddingTop:30*s}}
                > 
                    <TouchableOpacity onPress={()=>{this.takephoto()}}>
                    <Image   
                    source={this.state.imageUrl} 
                    style={{height:150*s,width:150*s}}
                    ></Image>
                    </TouchableOpacity>
                    
                    <Text  style={{marginTop:20*s,fontSize:35*s,color:'#fff'}}>BINNU DHILLON</Text>
                    <Image source={require('../images/bottom.png')} style={{height:100*s,width:"100%"}}/>
                </View> 
                <View>
                    <View style={styles.per1}>
                        <Icon color={'#aeaeae'} style={{marginLeft:10*s}} size={35*s} name='aliwangwang-o1'/>
                        <Text style={{marginLeft:30*s,fontSize:15*s}}>我的个人中心</Text>
                    </View>
                    <View
                        flexDirection='row'
                        flexWrap='wrap'
                        style={{borderBottomWidth:8*s,borderBottomColor:'#eeeeee',backgroundColor:'#fff'}}
                    >
                        <View style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s} name="database"/>
                            <Text style={styles.pert}>账户管理</Text>
                        </View>
                        <View style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="flag"/>
                            <Text style={styles.pert}>收货地址</Text>
                        </View>
                        <View style={styles.per} >
                            <Icon color={'#aeaeae'} size={50*s}  name="contacts"/>
                            <Text style={styles.pert}>我的信息</Text>
                        </View>
                        <View style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="minussquareo"/>
                            <Text style={styles.pert}>我的订单</Text>
                        </View>
                        <View style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="qrcode"/>
                            <Text style={styles.pert}>我的二维码</Text>
                        </View>
                        <View style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="gift"/>
                            <Text style={styles.pert}>我的积分</Text>
                        </View>
                        <View  style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="like2"/>
                            <Text style={styles.pert}>我的收藏</Text>
                        </View>
                    </View>
                    
                </View>

                <View>
                    <View   style={styles.per1}>
                        <Icon color={'#aeaeae'} style={{marginLeft:10*s}} size={35*s} name='tago'/>
                        <Text style={{marginLeft:30*s,fontSize:20*s}}>E族活动</Text>
                    </View>
                    <View style={styles.per2}>
                        <View style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s} name="key"/>
                            <Text style={styles.pert}>居家维修保养</Text>
                        </View>
                        <View style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="car"/>
                            <Text style={styles.pert}>出行接送</Text>
                        </View>
                        <View  style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="woman"/>
                            <Text style={styles.pert}>我的受赠人</Text>
                        </View>
                        <View style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="github"/>
                            <Text style={styles.pert}>我的住宿优惠</Text>
                        </View>
                        <View  style={styles.per}>
                            <Icon color={'#aeaeae'} size={50*s}  name="flag"/>
                            <Text style={styles.pert}>我的活动</Text>
                        </View>
                <View  style={styles.per}>
                    <Icon color={'#aeaeae'} size={50*s} onPress={()=>{Actions.mypublish()}} name="form"/>
                    <Text style={styles.pert} onPress={()=>{Actions.mypublish()}}>我的发布</Text>
                </View>
                    </View>
                </View>
                <TouchableOpacity 
                        style={styles.bt}
                        onPress={this.quit}
                    >
                        <Text style={{color:'white',fontSize:20}}>退出</Text>
                </TouchableOpacity>
                <View style={{width:width,justifyContent:"center",alignItems:"center",marginBottom:10*s}}>
                    <Text style={{color:'#666666',fontSize:18}}>BINNU DHILLON</Text>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles =StyleSheet.create({
    per:{
        justifyContent:'center',
        alignItems:'center',
        width:'33.33%',
        height:120*s,
        // backgroundColor:'#fff'
    },
    pert:{
        fontSize:20*s,
        marginTop:10*s,
        color:'#4f4e4e'
    },
    per1:{
        height:50*s,
        backgroundColor:"#fff",
        borderBottomWidth:1*s,
        borderBottomColor:'#eeeeee',
        flexDirection:'row',
        alignItems:'center'
    },
    per2:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:20*s,
        backgroundColor:'#fff'
    },
    bt:{
        width: '80%',
        height: 60*s,
        marginTop: 30*s,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10*s,
        backgroundColor:'red',
        marginLeft:'10%',
        marginBottom:40*s
    }
})
