import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,FlatList } from 'react-native';
import {  Icon } from '@ant-design/react-native';
import { ScrollView } from 'react-native-gesture-handler';
const {height,width} = Dimensions.get('window');

export default class TodaySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todaytasks:[1,2,3,4,5,6,7,8,8,88,8,8],
      completed:false
    };
  }

completeTask(){
  this.setState(prevState => ({completed: !prevState.completed}));
}


  render() {
    console.log(this.state);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.headerTxt}>Today</Text>
          <Text><Icon name="plus-circle" size="md" color="#0080FB" style={{marginTop: 10}}/></Text>
        </View>
        <View style={{height:'100%'}}>
       {this.state.todaytasks && (this.state.todaytasks || []).map((task) => (
    <View style={styles.todayscheduleMain}>
    <Text style={styles.scheduleTime}>09:00</Text>
    <View style={styles.taskname}>
    <Text style={styles.scheduleTxt}>Go to gym</Text>
    <Text style={styles.scheduleTxtdesc}>Chest day</Text>
    </View>
    <View style={styles.scheduleTime2}>
      {this.state.completed === true ?
      <Icon onPress={() => this.completeTask()} name="check-circle" size="md" color='#52c41a'/> :
    <Icon onPress={() => this.completeTask()} name="check-circle" size="md" color='grey'/>
      }
    </View>
  </View>  
       )) }
    
      
      
</View>


        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  headerTxt:{
        color:'#000',
        fontSize:22,
        textAlign:'left',
    },
    mainContainer:{
        width:'100%',
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingTop: '5%',
        // height:'100%'
    },
    TopsubTitle:{
        fontSize:17,
        color:'rgba(0,0,0,0.5)',
        // paddingBottom:'5%' ,
        fontWeight:'900'
    },
    topContainer:{
        paddingLeft: '5%',
        width:'100%',
        // height:'8%',
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
    },
    todayscheduleMain:{
      width:'100%',
      // padding:'3.7%',
      borderRadius:10,
      height:100,
      elevation:3,
      marginTop:'3%',
      marginBottom: '3%',
      backgroundColor:'#fff',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    scheduleTime:{
      width:'20%',
      textAlign:'center',
      color:'rgba(0,0,0,1)',
      fontSize:25
    },
    scheduleTxt:{
      width:'100%',
      textAlign:'center',
      fontSize:19,
      paddingLeft:'5%',
    },
    todayList:{
      display:'flex',
      alignItems:'center',
      height:'100%',
      paddingBottom: '3%',
      marginTop:'4%',
      // position:'absolute',
      // top:height/2,
      zIndex:999
    },
    taskname:{
      width:'55%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      // height:'100%'
    },
    scheduleTime2:{
      width:'15%'
    }
});