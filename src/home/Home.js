import React, { Component } from 'react'
import { View,Text,Image, TextInput,StyleSheet,
    Textinput,
    TouchableOpacity,
    Dimensions,
    FlatList,
    BackHandler
} from 'react-native'
import { Scene,Router, Actions,Tabs} from 'react-native-router-flux'
import Icon2 from 'react-native-vector-icons/AntDesign';


const{width,scale} =Dimensions.get('window');
const s=width / 640;

const goods =[
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good1.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good.png')
    },
    {
        title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: 36,
        img:require('../images/good.png')
    }
]

export default class Home extends Component {
    constructor(){
        super()
        this.state=({
            
        })

    }
    componentDidMount(){
        BackHandler.addEventListener('back',()=>{
            console.log('back');
            BackHandler.exitApp();
        })
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput 
                            style={{width:490*s,height:50*s}}
                            placeholder='请输入内容'
                            style={{
                                width:490*s,
                                height:50*s,
                                padding:0,
                                paddingLeft:10
                            }}
                        />
                        <Icon2 name='search1' />
                    </View>
                </View>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <Text>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>新品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>价格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>信用</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{backgroundColor:'#f4f4f4'}}
                    data={goods}
                    numColumns={2}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:180*s,width:100*s,marginTop:60*s}}
                            />
                            <Text
                                style={{marginTop:20,marginBottom:10}}
                            >{item.title}</Text>       
                            <Text
                                style={{width:'100%',color:'red'}}
                            >{item.price}</Text>       
                        </View>
                    )
                    }
                />
            </View>
        )
    }
}

const styles =StyleSheet.create({
    header:{
        height:70*s,
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1/3,
        justifyContent:'center',
        alignItems:'center'
    },
    search:{
        width:544*s,
        height:50*s,
        backgroundColor:'#e8e8e8',
        flexDirection:'row',
        alignItems:'center'
    },
    nav:{
        height:73*s,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    good:{
        width:290*s,
        backgroundColor:'#fff',
        marginLeft:20*s,
        marginTop:20*s,
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20
    }
})

