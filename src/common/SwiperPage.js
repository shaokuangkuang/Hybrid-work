import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';

export default class SwiperPage extends Component {
  start =  () => {
        AsyncStorage.setItem('isinstall','true',()=>{
            this.props.afterInstall();
        });
  };
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../images/slider4.jpg')}
          />
        </View> 
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../images/slider5.jpg')}
          />
        </View>
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../images/slider6.jpg')}
          />
        </View>
        <View style={styles.slide1} >
          <Image
            style={styles.img}
            source={require('../images/slider4.jpg')}
          />
          <TouchableOpacity style={styles.start}  onPress={this.start}>
            <Text style={{fontSize:25,color:"#fff"}}>立即开启</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    );
  }
}
const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  slide1: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  start: {
    position: 'absolute',
    bottom: 40,
    width: 220,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F',
    borderRadius: 10
  }
});