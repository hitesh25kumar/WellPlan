import React, { Component } from 'react';
import { View, Text,StatusBar,ScrollView,StyleSheet,Dimensions,Image } from 'react-native';
import Weather from './weather';
import TodaySchedule from './TodaySchedule';

const {height,width} = Dimensions.get('window');
export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={{flex:1}}>
      <ScrollView style={{marginBottom: 20,flex:1}}>
         <View style={{height:height-75}}>
            <StatusBar backgroundColor="rgba(62, 100, 255, 0.8)" barStyle='dark-content' />
            <Image
          style={styles.timeImg} resizeMode='cover'
          source={require('../assets/sea.jpg')}
        />
          <View style={styles.bubble}/>
          <View style={styles.topContainer}>
          <Text style={styles.name}> Hi Rider </Text>
        <Text style={styles.Scheduletxt}> Your weekly schedule right here </Text>
          </View>
          <Weather/>
          <TodaySchedule/>
          </View>
        
          </ScrollView>
          </View>
    );
  }
}
const styles = StyleSheet.create({
    topContainer:{
        width,
        height:height/3.3,
        backgroundColor:'#3e64ff',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        display:'flex',
        justifyContent:'center',
        paddingLeft: '4%',
    },
    name:{
        color:'rgba(255,255,255,1)',
        fontSize:23,
        letterSpacing:1
    },
    Scheduletxt:{
        color:'rgba(255,255,255,1)',
        fontSize:16,
        letterSpacing:1  
    },
    bubble:{
        position:'absolute',
        zIndex:9999,
        top:-120,
        left:-90,
        width:200,
        height:200,
        borderRadius:100,
        backgroundColor:'rgba(255,255,255,0.2)'
    },
    timeImg:{
      position:'absolute',
      opacity:0.3,
      height:height/1.5,
      width,
      bottom:0
          }
  });