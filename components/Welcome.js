import React, { Component } from 'react';
import { Button } from '@ant-design/react-native';

import { View, Text,StatusBar,StyleSheet,Dimensions,Image } from 'react-native';

const {height,width} = Dimensions.get('window');

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
           <StatusBar backgroundColor="rgba(255, 255, 255, 1)" barStyle='dark-content' />
     <View style={styles.mainContainer}>
     <Image
          style={styles.timeImg} resizeMode='cover'
          source={require('../assets/morning.jpg')}
        />
     <View style={styles.bubble}/>
     <View style={styles.bubble2}/>
     <View style={styles.topContainer}>
         <Text style={styles.textName}>Morning</Text> 
         <Text style={styles.textName}>Rider!</Text> 
     </View>
     <View>
         <Text style={styles.textName2}>
             Have a nice day!
         </Text>
     </View>
     <View style={styles.welcomImg}>
     <Image
          style={{width: 100, height: 100}}
          source={require('../assets/notepad.png')}
        />
     </View>
     <View>
     <Button type="primary" style={styles.btn} onPress={() => this.props.gotohome()}>Let's check schedule</Button>
     </View>
     </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer:{
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        display:'flex',
        width:'100%',
        height:'100%'
    },
    bubble:{
        position:'absolute',
        zIndex:9999,
        top:-100,
        left:-50,
        width:200,
        height:200,
        borderRadius:100,
        backgroundColor:'#fff'
    },
    bubble2:{
        position:'absolute',
        zIndex:0,
        bottom:-100,
        right:-50,
        width:200,
        height:200,
        borderRadius:100,
        backgroundColor:'#fff'
    },
    topContainer:{
        height:height/3,
        display:'flex',
        justifyContent:'flex-end',
        paddingLeft: '10%',
    },
    textName:{
     fontSize:40,
     fontWeight:'900' ,
     letterSpacing:2  
    },
    textName2:{
        fontSize:25,
        // fontWeight:'900' ,
        letterSpacing:2   ,
        paddingLeft:'10%',
        marginTop:'7%' 
    },
    welcomImg:{
        width:'100%',
        display:'flex',
        padding:'15%',
        paddingBottom: '8%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'8%'
    },
    btn:{
        width:'80%',
        marginLeft:'10%',
        borderRadius:10,
        backgroundColor:'#0080FB',
    },
    timeImg:{
position:'absolute',
opacity:0.4,
height,
width,
bottom:0
    }
  });