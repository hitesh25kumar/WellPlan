import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export default class calander2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
         <CalendarStrip
      style={{height:150, paddingTop: 20, paddingBottom: 10}}
    />
      </View>
    );
  }
}
