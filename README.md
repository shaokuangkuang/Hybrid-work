# Hybrid-work

完成功能：

1. 更换 logo 图标，更改App名字为 你的中文姓名；

   logo:

     ![pic](/src/images/1.png)

2. 实现启动画面，即 react-native-splash-screen 组件的功能；

   画面：   <img src="/src/images/2.jpg" alt="pic" style="zoom:25%;" />



3. 实现引导页，并记录状态，下次进入时不再显示 

4. 实现登录、注册页；

   1）均用fastmock编写接口（或自己服务器的接口），模拟请求延时效果；实现先注册才能登陆，输入检查功能。

   ```java
   {
    "code":"0000",
    "data":function({_req,Mock}){
    if(_req.body.username==='111111'){
      return({
        'token':0
      })
    }else if(_req.body.username==='222222'){
      return({
        'token':2
      })
    }else{
    return Mock.mock({
      "username":_req.body.username,
      "pwd":_req.body.pwd,
      "token":1
    })
    }
    },
    'desc':"成功"
   }
   ```

   



   2）点击登录按钮时，给出正在登录中的提示，效果自定，成功后跳转首页，并记录登录状态；

```javascript
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
```



   3）登录页有按钮可以跳转注册页，注册页有按钮可以回到登录页

```javascript
//注册页
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
//登录页
同 3）
```



   4）注册成功后自动跳转登录页

```javascript
//同4.1
```

 5、实现至少有 3 个 tab 的主结构，并至少有一个二级页面，可用第二三次任务的页面；

<img src="/src/images/3.jpg" alt="pic"/>

<img src="/src/images/4.jpg" alt="pic"/>

 6、点击退出登录时跳转登录页，清掉本地存储的登录状态，且此时点击硬件返回键（连续点两次退出应用），不能返回上一页； 

```javascript
//返回
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
//清除状态
      quit=()=>{
        AsyncStorage.removeItem('user',(error)=>{
            if (error) {
            }else {
                Actions.popTo("login");
            }
        })
    }
```

 7、将项目打成 签名版本的 apk 格式的包，可直接安装到手机 

<img src="/src/images/5.png" alt="pic"/>