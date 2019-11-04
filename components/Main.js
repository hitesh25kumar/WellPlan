import React, { Component } from 'react';
import { View, Text,Dimensions } from 'react-native';
import Home from './Home';
import Schedule from './Schedule';
import Profile from './Profile';
import Add from './Add';
import Welcome from './Welcome';
import Tabbar from './tabbar';

const {height,width} = Dimensions.get('window');

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentScreen:''
    };
  }

  gotohome = () => {
    this.setState({currentScreen:'blueTab'}) 
  }


  setCurrentTab = (currenttab) => {
      console.log('hjkghjghjg',currenttab);
      this.setState({currentScreen:currenttab})
  }
  render() {
      const { currentScreen } = this.state;
    return (
      <View style={{width,height}}>
           <View style={{height:height}}>
               {currentScreen === '' && <Welcome gotohome={this.gotohome}/>}
{ (currentScreen === 'blueTab') && <Home navigation={this.props.navigation}/> }
{ currentScreen === 'redTab' && <Schedule/> }
{ currentScreen === 'greenTab' && <Add/> }
{ currentScreen === 'yellowTab' && <Profile/> }
           </View>
           {/* <View style={{height:55}}>
<Tabbar navigation={this.props.navigation} currentTab={(currenttab) => this.setCurrentTab(currenttab)}/>
</View> */}
       
      </View>
    );
  }
}
