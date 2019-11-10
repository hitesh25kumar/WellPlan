import React, { Component } from 'react';
import { View, Text,StyleSheet,StatusBar,TouchableOpacity ,FlatList,Dimensions,ScrollView} from 'react-native';
import { Icon, SearchBar, TabBar } from '@ant-design/react-native';
import Database from '../Database';

const db = new Database();
const {height,width} = Dimensions.get('window');
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export default class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList:[
        {time:'10:30',address:'Bomanhalli',taskName:'Deepawali celebration'},
        {time:'1:30',address:'Ooty',taskName:'Ooty trip'},
 ],
 taskList: []
    };
  }

  componentDidMount(){
    this.tasks();
  }

  tasks() {
    let taskList = [];
    console.log('taskList: ', taskList);
    db.listProduct().then((data) => {
      taskList = data;
      this.setState({
        taskList,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  render() {
    const { taskList } = this.state;
      console.log(this.props,this.state,'task details');
    return (
      <View style={styles.mainContainer}>
           <StatusBar backgroundColor="#194DCB" barStyle='dark-content' />

          <View style={styles.topContainer}>

          </View>
          <View style={styles.middleContainer}>
<View style={styles.detailsTop}>
<View style={styles.topLeft}>
<Text style={styles.detailsmonth}>
{monthNames[new Date().getMonth()]}
</Text>
<Text style={styles.detailsdate}>
    {new Date().getDate()}
</Text>
</View>
<View style={styles.topRight}>
<Text style={styles.topRighttxt}>Today you have <Text style={{fontWeight:'bold',color:'#000'}}>{taskList.length}</Text> arrangements</Text>
</View>
</View>
<View style={styles.detailsBottom}>
<ScrollView horizontal contentContainerStyle={{width:'100%',height:'100%'}}>

{/* <FlatList horizontal={true}  showsVerticalScrollIndicator={false} showsVerticalScrollIndicator={false}  contentContainerStyle={{width:'100%',flex:1,paddingLeft:'5%',}}
        data={this.state.taskList}
        renderItem={({ item ,index}) =>  */}
        {this.state.taskList && (this.state.taskList || []).map((item,index) => (
       <View style={[styles.detailscard,{marginTop:index%2 === 0 ? 0 : 80,flex:1}]}>
        <Text style={styles.time}>{item.taskTime}</Text>
        <Text style={styles.taskName}>{item.taskName}</Text>
        </View>  
        ))}
  

</ScrollView>

</View>
          </View>
          <View style={styles.bottomContainer}>
<TouchableOpacity style={styles.fabbtn} onPress={() => this.props.navigation.navigate('Add')}>
<Icon name="plus" color="#194DCB" size='lg' />
</TouchableOpacity>
          </View>
        <Text> TaskDetails </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        flex:1,
        height:'100%',
        backgroundColor:'#194DCB'
    },
    topContainer:{
        paddingLeft: '5%',
        height:'3%',
        // marginTop:'2%',
        // paddingTop:'2%',
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
    },
    middleContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        borderTopLeftRadius:100
    },
    bottomContainer:{
        width:'93%',
        right:0,
        height:'20%',
        backgroundColor:'#194DCB',
        borderTopLeftRadius:100 ,
        position:'absolute',
        bottom:0,
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:'5%'
    },
    fabbtn:{
        width:55,
        height:55,
        borderRadius:30,
        backgroundColor:'#fff',
        elevation:15,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    detailsTop:{
        width:'100%',
        height:'25%',
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:'15%',
        paddingRight: '15%',
    },
    detailsmonth:{
      fontSize:18,
      fontWeight:'900'
    },
    detailsdate:{
      color:'#FF7F38',
      fontWeight:'bold',
      fontSize:35,
      letterSpacing:1,
      paddingLeft:'10%',
      marginBottom: '5%',
    },
    detailsTop:{
width:'100%',
display:'flex',
flexDirection:'row',
marginTop:'15%'
    },
    topRight:{
      width:'50%',
      display:"flex",
      alignItems:'flex-start',
      justifyContent:'flex-start',
    },
    topLeft:{
      width:'50%',
      // backgroundColor:'blue',
      paddingLeft: '15%',
    },
    topRighttxt:{
      textAlign:'right',
      paddingRight:'15%',
      color:'rgba(0,0,0,0.5)'
    },
    detailsBottom:{
width:'100%',

    },
    detailscard:{
      width:150,
      minWidth:150,
      backgroundColor:'#194DCB',
      borderRadius:15,
      marginLeft:'2.5%',
      marginRight: '2.5%',
      paddingRight: '2%',
      paddingTop: '10%',
      paddingLeft: '7%',
      paddingBottom: '10%',
      minHeight:'40%',
      marginBottom: '10%',
      height:'75%',
      minHeight:200
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
    location:{
      color:'#fff',
      marginTop:'10%'
    }
       
    
});