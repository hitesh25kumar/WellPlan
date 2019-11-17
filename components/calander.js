import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions,Image,StatusBar } from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {  Icon } from '@ant-design/react-native';


const {height,width} = Dimensions.get('window');


  
export default class calander extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList:[
        {time:'10:30',address:'Bomanhalli',taskName:'Deepawali celebration'},
        {time:'1:30',address:'Ooty',taskName:'Ooty trip'},
        {time:'10:30',address:'Bomanhalli2',taskName:'Deepawali celebration2'},
        {time:'1:30',address:'Ooty2',taskName:'Ooty trip2'},

      ]
    };
  }


  dayPress = (day) => {
   
//  console.log('selected day', day)
 this.props.navigation.navigate('TaskDetails')
  }
  

  render() {
    
const date = new Date();
const day = date.getDate();
let m = date.getMonth() + 1;
const y = date.getFullYear();
let d = day;
let minDate = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
console.log('minDate: ', minDate);

    return (
        <View style={styles.mainContainer}>
        <StatusBar backgroundColor="#194DCB" barStyle='light-content' />
          <View style={styles.topcalWrapper}>
          <Icon name="arrow-left" color="#fff" style={styles.back} onPress={() => this.props.navigation.goBack()}/>
<Text style={styles.calTitle}>Select a day to see its schedule</Text>
          </View>
            <View style={styles.calInnerContainer}>
                <View style={styles.calWrapper}>
        <CalendarList
scrollEnabled={true}
horizontal={true}
pagingEnabled={true}
style={{
    // height: 350,
  }}
        // Initially visible month. Default = Date()
        // current={'2019-10-16'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={minDate}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2020-05-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => this.dayPress(day)}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => this.dayPress(day)}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={' MM yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {console.log('month changed', month)}}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => (direction === 'left' ? <Icon name="left" size="md" color="#fff" /> : <Icon name="right" size="md" color="#fff" />)}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={substractMonth => substractMonth()}
        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}

        markedDates={{
            '2019-10-16': {selected: true, marked: true, selectedColor: 'blue'},
            '2019-10-17': {marked: true},
            '2019-10-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2012-05-19': {disabled: true, disableTouchEvent: true}
          }}

          theme={{
            backgroundColor: '#194DCB',
            calendarBackground: '#194DCB',
            textSectionTitleColor: '#fff',
            selectedDayBackgroundColor: '#194DCB',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#fff',
            dayTextColor: '#fff',
            textDisabledColor: 'grey',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#fff',
            monthTextColor: '#fff',
            indicatorColor: '#fff',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
      />
      </View>
      {/* <Agenda
  // the list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key kas to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={{
    '2012-05-22': [{text: 'item 1 - any js object'}],
    '2012-05-23': [{text: 'item 2 - any js object'}],
    '2012-05-24': [],
    '2012-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}]
  }}
  // callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={(month) => {console.log('trigger items loading')}}
  // callback that fires when the calendar is opened or closed
  onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
  // callback that gets called on day press
  onDayPress={(day)=>{console.log('day pressed')}}
  // callback that gets called when day changes while scrolling agenda list
  onDayChange={(day)=>{console.log('day changed')}}
  // initially selected day
  selected={'2012-05-16'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2012-05-30'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {return (<View />);}}
  // specify how each date should be rendered. day can be undefined if the item is not first in that day.
  renderDay={(day, item) => {return (<View />);}}
  // specify how empty date content with no items should be rendered
  renderEmptyDate={() => {return (<View />);}}
  // specify how agenda knob should look like
  renderKnob={() => {return (<View />);}}
  // specify what should be rendered instead of ActivityIndicator
  renderEmptyData = {() => {return (<View />);}}
  // specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
  // Hide knob button. Default = false
  hideKnob={true}
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
  markedDates={{
    '2012-05-16': {selected: true, marked: true},
    '2012-05-17': {marked: true},
    '2012-05-18': {disabled: true}
  }}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
  refreshControl={null}
  // agenda theme
 
 
/> */}
</View>
{/* <FlatList showsVerticalScrollIndicator={true} contentContainerStyle={{height}}
        data={this.state.taskList}
        renderItem={({ item ,index}) => <TouchableOpacity style={index % 2 === 0 ? styles.rightSidetask : styles.leftSidetask} onPress={() => this.props.navigation.navigate('TaskDetails',{index:index,item:item})}>
        <View style={styles.taskInnerDetails}>
        <Text style={styles.tasktime}>{item.time}</Text><Text style={styles.taskPlace}>{item.address}</Text>
        </View>
        <View style={styles.taskContainer}>
          <Text style={styles.taskNmae}>{item.taskName}</Text>
        </View>
        </TouchableOpacity>}
        // keyExtractor={item => item.id}
      /> */}
       <Image
          style={styles.timeImg2} resizeMode='contain'
          source={require('../assets/calander.png')}
        />
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#194DCB',
        display:'flex',
        // justifyContent:'center',
        alignItems:'center',
        paddingTop:'5%',
        height,
        width
    },
    calInnerContainer:{
        width:'100%',
        height:280
        // backgroundColor:'#fff',
        // elevation:5,
        // borderRadius:10,
        // display:'flex',
        // alignItems:'center',
        // justifyContent:'center'
    },
    calWrapper:{
        width:'100%',
        // padding: '0.5%',
        paddingLeft: 0,
        // height:height/2.2
    },
    leftStrip:{
position:'absolute',
right:0,
top: 0,
backgroundColor:'#194DCB',
width:20,
height:height/1.6,
zIndex:999999999,
elevation:5   },

rightSidetask:{
  width:'95%',
  marginLeft:'5%',
  backgroundColor:'rgba(255, 255, 2255, 0.2)',
  padding: '5%',
  marginTop:'7%',
  borderTopLeftRadius:50,
  borderBottomLeftRadius:50
},
taskInnerDetails:{
  width:'100%',
  display:'flex',
  justifyContent:'center',
  flexDirection:'row'
},
tasktime:{
  color:'#42b883',
  fontSize:17,
  fontWeight:'900',
  width:'40%',
  textAlign:'left',
  paddingLeft:'5%'
},
taskPlace:{
  color:'#fff',
  fontSize: 18,
  width:'60%',
  textAlign:'right',
  paddingRight:'3%'
},
taskContainer:{
  width:'100%',
  marginTop:'2%',
  paddingLeft: '5%',
},
taskNmae:{
  color:'#fff',
fontSize: 20,
fontWeight:'900',
letterSpacing:1
},
leftSidetask:{
  width:'95%',
  marginRight:'5%',
  backgroundColor:'rgba(255, 255, 2255, 0.2)',
  padding: '5%',
  marginTop:'7%',
  borderTopRightRadius:50,
  borderBottomRightRadius:50 
},
topcalWrapper:{
width,
display:'flex',
alignItems:'flex-start',
paddingLeft:'5%',
display:'flex',
flexDirection:'row'
},
calTitle:{
  color:'#fff',
  fontSize: 18,
  letterSpacing:1,
  paddingBottom:'5%',
  },
  back:{
    fontSize:22,
    padding:'1%',
    marginRight:'3%',
    borderRadius:20,
    backgroundColor:'transparent'
  },
  timeImg2:{
    width:300,
    height:190,
    marginTop:20
  }
});