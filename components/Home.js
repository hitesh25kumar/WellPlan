import React, { Component } from 'react';
import { View, Text,StatusBar,ScrollView,Dimensions,StyleSheet,TouchableOpacity,FlatList,RefreshControl,Image } from 'react-native';
import {  Icon,Button } from '@ant-design/react-native';
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
        tasks:[],
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
        tasks:products,
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
      const { refreshing, tasks } = this.state;
// var res = str.substring(0, 2);
// var res = str.substring(3, 6);
// var res = str.substring(5, 8);
      const date = new Date();
const day = date.getDate();
let m = date.getMonth() + 1;
const y = date.getFullYear();

    return (
      <View style={styles.MainContainer}>
          <View style={styles.background}/>
          <StatusBar backgroundColor="rgba(255,255,255,1)" barStyle='dark-content' />
<View style={styles.topContainer}>
    <Text style={styles.TopTitle}>My Day</Text>
    
    <Icon name="calendar" size="md" color="#194DCB" style={{marginTop: 10}} onPress={() => this.props.navigation.navigate('calander')}/>
</View>
<View style={styles.mainContainerInner} 
      >
    <Text style={styles.TopsubTitle}>Here is your today's routine</Text>
    {tasks[0] !== undefined ?
    <View style={{display:'flex',flex:1,width:'100%',}}>
    <ScrollView
    showsVerticalScrollIndicator={false}  
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}>
      {this.state.tasks && (this.state.tasks || []).map((item,index) => (
 <HomeCard key={Math.random()} tasks={item} taskNo={index}/>
      ))}
      </ScrollView>
        
        <View>
          {/* {item.taskDate === day && item.taskMonth === m && item.taskYear === y && */}
        
      {/* } */}
         </View>
       
       

   </View>
   :
   <View style={styles.noDataContainer}>
<Text style={styles.noTaskTxt}>Looks like you haven't added any tasks yet.</Text>
<Image
          style={styles.timeImg2} resizeMode='contain'
          source={require('../assets/no-tasks.png')}
        />
         <Button type="primary" style={styles.btn} onPress={() => this.props.navigation.navigate('Add')}>Add new task</Button>
    
   </View>
  }
</View>
<View>
</View>
{tasks[0] !== undefined &&
<View style={styles.bottomContainer}>
<TouchableOpacity style={styles.fabbtn} onPress={() => this.props.navigation.navigate('Add')}>
<Icon name="plus" color="#fff" size='lg' />
</TouchableOpacity>
          </View>
  }
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
    flex:1,
    
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
        bottom:0,
        // display:'flex',
        // alignItems:'flex-end',
        // justifyContent:'center',
        // paddingRight:'5%'
    },
    fabbtn:{
        width:55,
        height:55,
        borderRadius:30,
        zIndex:99999,
        backgroundColor:'#194DCB',
        elevation:5,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    noTaskTxt:{
      fontSize:22,
      width:'100%',
      textAlign:'left'
    },
    noDataContainer:{width:'100%',height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding: '10%',
    },
    timeImg2:{
      width:width/1.1,
      height:height/2,
      marginTop:20
    },
    btn:{
      width:'80%',
      marginLeft:'10%',
      borderRadius:10,
      backgroundColor:'#194DCB',
  },
});