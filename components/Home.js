import React, { Component } from 'react';
import { View, Text,StatusBar,ScrollView,Dimensions,StyleSheet,TouchableOpacity,FlatList,RefreshControl,ActivityIndicator } from 'react-native';
import {  Icon } from '@ant-design/react-native';
import HomeCard  from './HomeCard';
import Database from '../Database';

const db = new Database();

const {height,width} = Dimensions.get('window');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        refreshing:false,
        isLoading: true,
        products: [],
        notFound: 'Products not found.\nPlease click (+) button to add it.',
        tasks:[
           { taskDetails: {
                taskName: 'task1',
                taskDesc: '',
                taskDate:2,
                taskMonth:11,
                taskYear:2019,
                taskTime:'2:06PM',
                dailyReminder:true,
                
            },
            taskStatus:'scheduled',
            createdDate:new Date()
        },
        { taskDetails: {
            taskName: 'task2',
            taskDesc: '',
            taskDate:2,
            taskMonth:11,
            taskYear:2019,
            taskTime:'2:06PM',
            dailyReminder:true,
            
        },
        taskStatus:'scheduled',
        createdDate:new Date()
    },     { taskDetails: {
        taskName: 'task3',
        taskDesc: '',
        taskDate:2,
        taskMonth:11,
        taskYear:2019,
        taskTime:'2:06PM',
        dailyReminder:true,
        
    },
    taskStatus:'scheduled',
    createdDate:new Date()
},
{ taskDetails: {
    taskName: 'task1',
    taskDesc: '',
    taskDate:2,
    taskMonth:11,
    taskYear:2019,
    taskTime:'2:06PM',
    dailyReminder:true,
    
},
taskStatus:'scheduled',
createdDate:new Date()
},
{ taskDetails: {
    taskName: 'task1',
    taskDesc: '',
    taskDate:2,
    taskMonth:11,
    taskYear:2019,
    taskTime:'2:06PM',
    dailyReminder:true,
    
},
taskStatus:'scheduled',
createdDate:new Date()
},
{ taskDetails: {
    taskName: 'task1',
    taskDesc: '',
    taskDate:2,
    taskMonth:11,
    taskYear:2019,
    taskTime:'2:06PM',
    dailyReminder:true,
    
},
taskStatus:'scheduled',
createdDate:new Date()
},
{ taskDetails: {
    taskName: 'task1',
    taskDesc: '',
    taskDate:2,
    taskMonth:11,
    taskYear:2019,
    taskTime:'2:06PM',
    dailyReminder:true,
    
},
taskStatus:'scheduled',
createdDate:new Date()
},
{ taskDetails: {
    taskName: 'task1',
    taskDesc: '',
    taskDate:2,
    taskMonth:11,
    taskYear:2019,
    taskTime:'2:06PM',
    dailyReminder:true,
    
},
taskStatus:'scheduled',
createdDate:new Date()
},

        ],
        colors:[{color1:'red',color2:'blue'},{color1:'yellow',color2:'grey'},{color1:'red',color2:'pink'},{color1:'red',color2:'orange'},{color1:'black',color2:'blue'}]
    };
  }

componentDidMount(){
  this.getProducts();
  this._subscribe = this.props.navigation.addListener('didFocus', () => {
    this.getProducts();
  });
}

getProducts() {
    let products = [];
    console.log('products: ', products);
    db.listProduct().then((data) => {
      products = data;
      this.setState({
        products,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

onRefresh = () => {
    this.setState({refreshing:true})
this.getProducts();
}

keyExtractor = (item, index) => index.toString()

  render() {
      console.log('this.state',this.state)
      const { refreshing } = this.state;
    return (
      <View style={styles.MainContainer}>
          <View style={styles.background}/>
          <StatusBar backgroundColor="rgba(255,255,255,1)" barStyle='dark-content' />
<View style={styles.topContainer}>
    <Text style={styles.TopTitle}>My Day</Text>
    
    <Icon name="calendar" size="md" color="#194DCB" style={{marginTop: 10}} onPress={() => this.props.navigation.navigate('calander')}/>
</View>
<ScrollView contentContainerStyle={styles.mainContainerInner} showsVerticalScrollIndicator={false}  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
    <Text style={styles.TopsubTitle}>You have 4 meetings today</Text>
    <View style={{display:'flex',height:'100%',width:'100%',}}>
    <FlatList
        data={this.state.products}
        renderItem={({ item,index }) =>  <HomeCard key={Math.random()} tasks={item} taskNo={index}/>}
        keyExtractor={item => Math.random()}
      />

   </View>
</ScrollView>
<View>
</View>
<View style={styles.bottomContainer}>
<TouchableOpacity style={styles.fabbtn} onPress={() => this.props.navigation.navigate('Add')}>
<Icon name="plus" color="#fff" size='lg' />
</TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    MainContainer: {
        height,
        width,
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    topTextLeft:{
        color:'#0080FB',
        fontSize:22,
        textAlign:'left',
        paddingLeft:'12%',
        marginBottom: '3%',
    },
    TopTitle:{
        fontSize:33,
        color:'rgba(0,0,0,1)',
        fontWeight:'800',
        width:'90%',
    },
    TopsubTitle:{
        fontSize:17,
        color:'rgba(0,0,0,0.5)',
        paddingBottom:'5%' ,
        fontWeight:'900',
        paddingLeft:'5%'
    },
    topContainer:{
        paddingLeft: '5%',
        
        
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
    },
    background:{
        backgroundColor:'#0080FB',
        height:500,
        position:'absolute',
        backgroundColor:'yellow',
        zIndex:9999
    },
    mainContainerInner:{
        display:'flex',
        flexDirection:'column',
       paddingBottom:50,
    
    
       display:'flex'
    },
    bottomContainer:{
        width,
        right:10,
        height:'20%',
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'flex-start',
        // backgroundColor:'#194DCB',
        // borderTopLeftRadius:100 ,
        position:'absolute',
        bottom:20,
        // display:'flex',
        // alignItems:'flex-end',
        // justifyContent:'center',
        // paddingRight:'5%'
    },
    fabbtn:{
        width:55,
        height:55,
        borderRadius:30,
        backgroundColor:'#194DCB',
        elevation:25,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
});