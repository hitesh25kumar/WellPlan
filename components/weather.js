import React, { Component } from 'react';
import { View, Text ,Image,StyleSheet} from 'react-native';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentWeather:'',
        currentDate:''
    };
  }

  componentDidMount(){
      this.getWeather();
      const d = new Date().toString();
const r = d.slice(0, 15)
this.setState({currentDate:r})
  }

   async getWeather(){
        try {
          let response = await fetch(
            'http://api.weatherstack.com/current?access_key=f1d73ce64700247e540628c26961897f&query=bangalore',
          );
          let responseJson = await response.json();
          console.log('responseJson: ', responseJson);
          this.setState({currentWeather:responseJson})
          return responseJson;
        } catch (error) {
          
        }
      }

  render() {
      console.log(this.state.currentWeather);
      const { currentDate,currentWeather } = this.state;
    return (
      <View style={styles.mainContainer}>
          <View>
        <Text style={styles.currentDate}>{currentDate}</Text>
        {currentWeather.current &&
        <Text style={styles.Weather}>{currentWeather.current.weather_descriptions[0]}</Text>
        }
        {currentWeather.current && currentWeather.current.temperature &&
       <View style={styles.tempWrapper}> 
           <Text style={styles.tempvalue}>{currentWeather.current.temperature}</Text>
           <Text style={{fontSize:18,paddingTop: 12,}}>°C</Text>
           </View>
        }
        </View>
        {currentWeather.current &&
        <View style={styles.imgContainer}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: currentWeather.current.weather_icons[0]}}
        />
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer:{
        width:'90%',
        marginLeft:'5%',
        marginTop:'-15%',
        height:140,
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:10,
        display:'flex',
        paddingLeft: '10%',
        paddingTop: '5%',
        paddingBottom: '5%',
        flexDirection:'row'
    },
    currentDate:{
        fontSize:22,
        fontWeight:'900'
    },
    Weather:{
        fontSize:18,
        fontWeight:'900' ,
        marginTop:'5%' 
    },
    tempvalue:{
        color:'#3e64ff',
        fontSize:33,
        paddingTop:'3%'
    },
    imgContainer:{
        height:'100%',
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        marginLeft:'3%'
    },
    tempWrapper:{
        display:'flex',
        flexDirection:'row'
    }
  });