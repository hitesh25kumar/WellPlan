import React, { Component } from 'react';
import { View, Text, Dimensions,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width,height} = Dimensions.get('window');
export default class Updatetaskdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      console.log(this.props);
      const { taskDetails,color1,color2,color3 } = this.props;
    return (
      <View style={styles.updateTaskWrapper}>
            <LinearGradient colors={[color1,color2,color3]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.cardInner}>


          <Text> {taskDetails.taskDetails.taskName} </Text>
        <Text> {taskDetails.taskDetails.taskDate} </Text>
        <Text> {taskDetails.taskDetails.taskMonth} </Text>
        <Text> {taskDetails.taskDetails.taskYear} </Text>
        <Text> {taskDetails.taskDetails.taskTime} </Text>
        <Text> {taskDetails.taskDetails.dailyReminder} </Text>
        <Text> {taskDetails.taskDetails.taskDesc} </Text>
        <Text> {taskDetails.taskStatus} </Text>
        </LinearGradient>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    updateTaskWrapper:{
         width:width - width * 10 /100,
         height:height - 100,
        
         
     },
     cardInner:{width:'100%',height:'100%',padding:'5%', borderRadius:10,}
   });
   