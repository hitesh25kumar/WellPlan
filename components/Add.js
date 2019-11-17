import React, { Component } from 'react';
import { View, Text,StyleSheet,StatusBar,KeyboardAvoidingView,Image } from 'react-native';
import { Button, InputItem ,Checkbox} from '@ant-design/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
var PushNotification = require("react-native-push-notification");
import {  Icon } from '@ant-design/react-native';
import {firebaseApp} from './firebase';
import Database from '../Database';

const db = new Database();

export default class Add extends Component {
  constructor(props) {
    super(props);
    const id = '9756740984';
    this.tasksRef = firebaseApp.database().ref(`tasks/${id}`);
    this.state = {
      taskName:'',
      taskDesc:'',
      Location:'',
      dailyReminder:false,
      errmsg:'',
      error:false,
      date: new Date(),
      mode: 'datetime',
      show: false,
      timeSelected:false,
      dateSelected:false,
      attempted:false,
      prodId: '',
      prodName: '',
      prodDesc: '',
      prodImage: '',
      prodPrice: '0',
      isLoading: false,
    };
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
    this.setState({dateSelected:true})
  }

  timepicker = () => {
    this.show('time');
    this.setState({timeSelected:true})
  }

  onSwitchChange = (e) => {
    this.setState({dailyReminder: e.target.checked});
  }
  cancel = () => {
    this.props.navigation.goBack();
  }
  next = () => {
    console.log('next');
    this.setState({attempted:true})
    if(this.state.taskName === ''){
this.setState({errmsg:'Please give a name to your task',error:true})
    }
    else{
      console.log('aaaa');
      this.saveProduct();
    }
    
  }
  goBack = () => {
    this.setState({screen:1})
  }

addTask = () => {
  console.log('add');
  const { date, dailyReminder } = this.state;
  this.tasksRef.push({
    taskDetails: {
     taskName: this.state.taskName,
     taskDesc: this.state.taskDesc,
     taskDate:date.getDate(),
     taskMonth:date.getMonth() + 1,
     taskYear:date.getFullYear(),
     taskTime:date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
     dailyReminder:dailyReminder,
     
 },
 taskStatus:'scheduled',
 createdDate:new Date()
}, function(error){
 if(error){
   console.log('error: ', error);
   
 }
 else{
   console.log('success');
 }
}
);
}

saveProduct = () => {
  const { date, dailyReminder } = this.state;
  this.setState({
    isLoading: false,
  });
  const hour = date.getHours();
  const min = date.getMinutes();
//schedule tasks
 PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      color: "blue",
      repeatType:"day",
    vibration: 800,
    playSound: true,
    soundName: 'my_sound.mp3',
      title: this.state.taskName,
      message: `${hour > 12 ? hour - 12 : hour}:${min} ${hour >= 12 ? 'PM' : 'AM'}`, // (required)
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0)// in 60 secs  09-11-2019 08:00  current-date
    });
 

 
  const data = {
     taskId: date.getTime(),
    taskName: this.state.taskName,
     taskDate:date.getDate(),
     taskMonth:date.getMonth() + 1,
     taskYear:date.getFullYear(),
     taskTime: `${hour > 12 ? hour - 12 : hour}:${min} ${hour >= 12 ? 'PM' : 'AM'}`,
     taskHour:date.getHours(),
     taskMin:date.getMinutes(),
     taskDesc: this.state.taskDesc,
     priority:'normal',
     dailyReminder:dailyReminder,
     taskStatus:'sheduled',
  }

  console.log('data: ', data);
  db.addProduct(data).then((result) => {
    console.log(result);
    this.setState({
      isLoading: false,
    });
    this.props.navigation.goBack();
  }).catch((err) => {
    console.log(err);
    this.setState({
      isLoading: false,
    });
  })
}

  render() {
    console.log(this.state);
    const { show, date, mode,dateSelected,timeSelected,attempted } = this.state;
    const lastday = date.getDate();
    let lastmonth = date.getMonth() + 1;
const lastyear = date.getFullYear();
const hour = date.getHours();
console.log('hour: ', hour > 12 ? hour - 12 : hour);
console.log('hour: ', hour >= 12 ? 'PM' : 'AM');
const min = date.getMinutes();
console.log('min: ', min > 9 ? min : `0${min}`);
const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    console.log('lastday: ', lastday,lastmonth,lastyear,time);
    let mydate = JSON.stringify(this.state.date)
    console.log('mydate: ', mydate,hour,min);
mydate = mydate.slice(1,11)
console.log('mydate: ', mydate);
    return (
      <KeyboardAvoidingView style={styles.maimWrapper}  behavior="height">
          <StatusBar backgroundColor="#194DCB" barStyle='light-content' />
       <View style={styles.topWrapper}>
       <Image
          style={styles.timeImg} resizeMode='contain'
          source={require('../assets/clock.png')}
        />
<Text style={styles.taskTopHeader}>Add a task</Text>
<Text style={styles.taskTopdesc}>You will be updated with your tasks that you have to do</Text>
       </View>
       <View style={styles.topWrapper2}>

</View>
       <View style={styles.bottomWrapper}>
         <View style={styles.inputWrapper}>
         <Text style={styles.inputLabel}>Task Name</Text>
       <InputItem style={styles.input}
            error={this.state.taskName === '' && attempted === true}
            value={this.state.taskName}
            onChange={value => {
              this.setState({
                taskName:value,
              });
            }}
            placeholder="Task name"
          >
          </InputItem>

         </View>
         {this.state.taskName === '' && this.state.errmsg !== '' && <Text style={{color:'red',paddingLeft: '5%'}}>{this.state.errmsg}</Text>}
         <View style={styles.inputWrapper}>
          
         <View style={styles.datetxtWrapper}>
         
         <View style={styles.dateBtn}>
               <Icon name="calendar" size="md" color='#194DCB' style={{marginRight:'5%'}} />
               {dateSelected === false ?
           <Text style={{color:'#000'}}>Select Date</Text>
           :
           <Text style={styles.dateTxt}>{`${lastday}/${lastmonth}/${lastyear}`}</Text>
         }
         </View>
           <Button style={styles.dateBtn2} onPress={this.datepicker}><Text style={{color:'#fff',fontSize:15,width:'100%'}}>Select Date</Text></Button>
           </View>
           
           
         <View style={styles.datetxtWrapper}>
        
         <View style={styles.dateBtn}>
            <Icon name="clock-circle" size="md" color='#194DCB' style={{marginRight:'5%'}} />
            {timeSelected === false ?
           <Text style={{color:'#000'}}>Select Time</Text>
         :
           <Text style={styles.dateTxt}>{date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
         }
         </View>
          <Button style={styles.dateBtn2} onPress={this.timepicker}><Text style={{color:'#fff',fontSize:15,width:'100%'}}>Select Time</Text></Button>
       </View>
           
            { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={false}
                    display='spinner'
                    onChange={this.setDate} />
        }
         </View>
         <View style={styles.inputWrapper}>
         <Checkbox style={styles.check} onChange={this.onSwitchChange}>Daily Reminder</Checkbox>
         </View>
         <View style={styles.btnWrapper}>
         <Button style={styles.cancelbtn} onPress={this.cancel}><Text style={{color:'#194DCB'}}>Cancel</Text></Button>
         <Button style={styles.next} onPress={this.next}><Text style={{color:'#fff'}}>Confirm</Text></Button>
         
         </View>
         </View> 
         
       </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  maimWrapper:{
width:'100%',
height:'100%',
backgroundColor:'#194DCB',
display:'flex',
alignItems:'center',
justifyContent:'flex-end'
  },
  topWrapper: {
    display:'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width:'100%',
      paddingLeft:'5%',
      paddingBottom:'3%',

  },
  bottomWrapper:{
width:'100%',
backgroundColor:'#fff',
borderTopLeftRadius:30,
borderTopRightRadius:30,
elevation:9,
display:'flex',
justifyContent:'center',
paddingBottom: '5%',
paddingTop: '5%',
  },
  bottomWrapper2:{
    height:'70%',
    width:'100%',
    backgroundColor:'#fff',
    borderWidth:0,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    elevation:9,
    display:'flex',
    justifyContent:'center',
  },
  input:{
    borderBottomWidth:1,
    borderRadius:8,
    borderColor:'#194DCB',
    paddingLeft: 10,
  },
  inputLabel:{
    color:'rgba(0,0,0,0.2)',
    fontSize:16,
    paddingLeft:'4%',
    paddingBottom:'2%'
  },
  inputWrapper:{
    width:'100%',
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    padding:'3%',
    paddingLeft:'0%',
    borderWidth:0,
  },
  check:{
    marginLeft:'5%',
    color:'#194DCB',
  },
  btnWrapper:{
    width:'100%',
    marginTop:'7%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
  },
  cancelbtn:{
    borderRadius:8,
    paddingLeft:'8%',
    paddingRight: '8%',
    borderWidth:1,
    borderColor:'#194DCB',
  },
  next:{
    borderRadius:8,
    paddingLeft:'10%',
    paddingRight: '10%',
    backgroundColor:'#194DCB',
    
  },
  screen2Btm:{
    paddingTop:'10%',
    paddingBottom: '10%',
  },
  dateBtn:{
    borderRadius:15,
    marginLeft:'5%',
    paddingRight: '10%',
    paddingTop:'2%',
    paddingBottom: '2%',
    borderRadius:0,
    width:'65%',
    borderBottomWidth:1,
    borderColor:'#194DCB',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    // backgroundColor:'red'
  },
  dateBtn2:{
    borderRadius:15,
    borderRadius:5,
    maxHeight:38,
    // width:'30%',
    borderWidth:0,
    display:'flex',
    alignItems:'flex-start',
    backgroundColor:'#194DCB'
  },
  dateTxt:{
    fontSize:15,
    paddingBottom: '3%',
    paddingTop:'2%',
    marginTop:'2%',
    width:'60%',
    marginLeft:'5%',
  },
  datetxtWrapper:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding: '3%',
    paddingLeft: '0%',
    borderBottomWidth:0,
    borderColor:'#194DCB',
    paddingTop: '3%',
    paddingBottom: '3%',
    alignItems:'center'
  },
  taskTopHeader:{
    color:'#fff',
    fontSize:22
  },
  taskTopdesc:{
    color:'#fff',
    fontSize:16
  },
  timeImg:{
    width:200,
    height:140,
    marginTop:100
  }
});