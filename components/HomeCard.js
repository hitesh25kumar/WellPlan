import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions, TouchableOpacity,Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {  Icon } from '@ant-design/react-native';
import Updatetaskdetails from './updatetaskdetails';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {firebaseApp} from './firebase';
import Database from '../Database';
import { throwStatement } from '@babel/types';

const db = new Database();

const colorsarr = ['#d597ce', '#f35588', '#c355f5','#57007e','#fc7978','#8186d5','#5edfff','#3e64ff','#8d448b','#3c70a4'];  

const {width} = Dimensions.get('window');

export default class HomeCard extends Component {
  constructor(props) {
    super(props);
    const id = '9756740984';
    this.tasksRef = firebaseApp.database().ref(`tasks/${id}/`);
    this.onSwipeUp = this.onSwipeUp.bind(this);
    this.onSwipeDown = this.onSwipeDown.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.state = {
      updateTask:false,
      currentTask:'',
      taskStatus:'scheduled'
    };
  }

  componentDidMount(){
    const { tasks } = this.props;
    this.setState({taskStatus:tasks.taskStatus})
  }

  updatetaskDetails = (tasks) => {
    console.log('tasks: ', tasks);
    // this.setState({updateTask:true,currentTask:tasks})
  }

  onSwipeUp(gestureState) {
    // this.setState({myText: 'You swiped up!'});
    console.log('You swiped up!');
  }
 
  onSwipeDown(gestureState) {
    console.log('You swiped down!');
  }
 
  onSwipeLeft(gestureState) {
    console.log('You swiped left!');
    const that = this;
    this.setState({taskStatus:'scheduled'},function(){
     that.updateProduct(); 
    })
  }
 
  onSwipeRight(gestureState) {
    const that = this;
    this.setState({taskStatus:'completed'},function(){
     that.updateProduct(); 
    })
    console.log('You swiped right!');
    // this.markTaskComplete()
  }

  markTaskComplete = () => {
    firebaseApp.database().ref(`tasks/${id}/LrtamDIzK2gtd_6DQI0`).once("child_added", function(snapshot) {
  snapshot.ref.update({ taskStatus: "New trainer" })
});
  }

  updateProduct() {
    const { tasks } = this.props;
    this.setState({
      isLoading: true,
    });
    const data = {
      taskId: tasks.taskId,
     taskName: tasks.taskName,
      taskDate:tasks.taskDate,
      taskMonth:tasks.taskMonth,
      taskYear:tasks.taskYear,
      taskTime:tasks.taskTime,
      taskDesc: tasks.taskDesc,
      priority:'normal',
      dailyReminder:tasks.dailyReminder,
      taskStatus:this.state.taskStatus,
      createdTime:'new Date()'
   }

   console.log('data: ', data);
    db.updateProduct(data.taskId, data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }
 

  render() {
    console.log('th',this.props,this.state);
    const { tasks } = this.props;
    const { updateTask,currentTask,taskStatus} = this.state;
    const color1 = [colorsarr[Math.floor(Math.random() * colorsarr.length)]];
    const color2 = [colorsarr[Math.floor(Math.random() * colorsarr.length)]];
    const color3 = [colorsarr[Math.floor(Math.random() * colorsarr.length)]];
    return (
      
      <View style={styles.cardMian}>

{tasks && 
  <GestureRecognizer
  // onSwipe={this.onSwipe}
  onSwipeUp={this.onSwipeUp}
  onSwipeDown={this.onSwipeDown}
  onSwipeLeft={this.onSwipeLeft}
  onSwipeRight={this.onSwipeRight}
  >

     <LinearGradient colors={[color1, color2,color3]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.cardInner}>
<View style={[styles.current,{backgroundColor:taskStatus !== 'completed' ? 'red' :'green'}]}>
{taskStatus !== 'completed' ?
<Icon name="close" color="#fff"/>:
<Icon name="check" color="#fff"/>
}
</View>
            <Text style={styles.TopTitle}>{tasks.taskTime}</Text>
            <Text style={styles.TopsubTitle}>{tasks.taskName}</Text>
            <Text style={styles.desc}>{tasks.taskDesc}</Text>
            </LinearGradient>
            </GestureRecognizer>
}
{updateTask === true &&
<Updatetaskdetails taskDetails={currentTask} color1={color1} color2={color2} color3={color3}/>
}
                </View>
    );
  }
}

const styles = StyleSheet.create({
 TopTitle:{
      fontSize:20,
      color:'#fff',

      paddingBottom: '1%',
  },
  TopsubTitle:{
    fontSize:20,
    color:'#fff',
    paddingBottom: '1%',
  },
  desc:{
    fontSize:15,
    color:'#fff',
    paddingBottom: '1%',
  },
  cardInner:{
    paddingLeft:'3%',paddingTop:'3%',paddingBottom: '3%',borderRadius:5,elevation:4,width:width - width * 10 /100,minHeight:100
  },

  cardMian:{width:'90%',marginLeft:'5%',minHeight:100,marginTop: '5%'},
  current:{
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:'#fff',
    position:'absolute',
    top:28,
    right:15,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  taskCategory:{
marginBottom: 10,

  },
  taskDate:{
fontSize:18,
color:'#194DCB',
fontWeight:'bold'
  },
  leftAction:{
    width:'100%',
    height:'100%',
    backgroundColor:'red'
  },
  swipe:{
    width:300,
    height:200,
    backgroundColor:'red' 
  }
});
