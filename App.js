import React, { Component } from 'react'
import {BackHandler,ToastAndroid, AsyncStorage,View} from 'react-native';
import {Router,Scene, Tabs,Actions} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/AntDesign'
import {Dimensions} from 'react-native'

import Home from './src/home/Home'
import User from './src/userinfor/User'
import Login from './src/common/Login'
import Goods from './src/goods/Goods'
import Mypublish from './src/goods/Mypublish';
import Registered from './src/common/Registered';
import SwiperPage from './src/common/SwiperPage';

const{width,scale} =Dimensions.get('window');
const s=width / 640;

export default class App extends Component {
  constructor(){
    super();
    this.state={
	  isLogin:true,
	  isInstall:true
    }
  }
  componentDidMount(){
	  AsyncStorage.getItem('isinstall')
	  .then(res=>{
		if(res){
			console.log('dsada')
			this.setState({
				isInstall:false
			})
		}
	  })
    AsyncStorage.getItem('user')
		.then(res=>{
			let user =JSON.parse(res)
			console.log(user,'231')
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
        		this.setState({
          		isLogin:false
        	});
				SplashScreen.hide();
			}
		})
  }
  render() {
	let afterInstall =()=>{
		this.setState({
			isInstall:false
		})
	}
	if(this.state.isInstall){
		return<View style={{flex:1}}>
				<SwiperPage afterInstall={afterInstall}/>
			</View>
		}

    return (
      <Router
			backAndroidHandler={()=>{
				if(Actions.currentScene != 'home'){
					Actions.pop();
					return true;
				}else{
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}
				
			}}
		  >
         <Scene key="root">
             <Tabs
                hideNavBar
             >
				<Scene key='首页' 
					icon={
						({focused})=><Icon 
							color={focused?'red':'black'} name="home" size={30*s}/>}
				>
					<Scene key='user' hideNavBar={true} component={User}/>
				</Scene>
				<Scene key='详情'
					icon={
						({focused})=><Icon 
							color={focused?'red':'black'} name="find" size={30*s}/>}
				>
					<Scene key='home' hideNavBar={true} component={Home}/>
				</Scene>
                <Scene key='用户'
					icon={
						({focused})=><Icon 
							color={focused?'red':'black'} name="user" size={30*s}/>}
				>
					<Scene key='good' hideNavBar={true} component={Goods}/>
					<Scene 
					backButtonTintColor='white'
					navigationBarStyle={{backgroundColor:'#f23030'}} 
					key='mypublish' 
					title="我的发布"  
					back='true'
					hideTabBar
					titleStyle={{flex:1,textAlign:'center',color:'white'}}
					component={Mypublish}
					renderRightButton={<View></View>}/>
				</Scene>
             </Tabs>
             <Scene hideNavBar initial={this.state.isLogin} key="login" component={Login}/>
			 <Scene hideNavBar  key="zhuce" component={Registered}/>
         </Scene> 
      </Router>
    )
  }
}
