import React from 'react';
import { View, Text,StyleSheet,StatusBar,TouchableOpacity ,FlatList,Dimensions,ScrollView} from 'react-native';
const {height,width} = Dimensions.get('window');

const Taskdesc = (props) => (
    <View style={[styles.detailscard,{marginTop:props.index % 2 !== 0 ? 20 : 0}]}>
    <Text style={styles.time}>{props.item.taskTime}</Text>
    <Text style={styles.taskName}>{props.item.taskName}</Text>
    </View> 
);

export default Taskdesc;

const styles = StyleSheet.create({

    detailscard:{
        
        width:width/2.3,
        // minWidth:width/2.5,
        backgroundColor:'#194DCB',
        borderRadius:15,
        marginLeft:'2.5%',
        marginRight: '2.5%',
        paddingRight: '5%',
        paddingTop: '10%',
        paddingLeft: '5%',
        paddingBottom: '5%',
        marginBottom:'5%',
        // height:'100%',
        minHeight:160,
        // maxHeight:200
      },
      time:{
        color:'#fff',
        fontWeight:"bold",
        fontSize:25
      },
      taskName:{
       color:'#fff',
       fontSize:22 ,
       marginTop:'16%'
      },
});