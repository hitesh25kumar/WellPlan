import React, {Component} from 'react';
import {View, Text} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
 
class Example extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff'
    };
  }
 
  onSwipeUp(gestureState) {
    // this.setState({myText: 'You swiped up!'});
    console.log('You swiped up!');
  }
 
  onSwipeDown(gestureState) {
    console.log('You swiped down!');
  }
 
  onSwipeLeft(gestureState) {
    console.log('You swiped left!');
  }
 
  onSwipeRight(gestureState) {
    console.log('You swiped right!');
  }
 
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    // this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
            console.log('You swiped up!');
        // this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
            console.log('You swiped down!');
        // this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
            console.log('You swiped left!');
        break;
      case SWIPE_RIGHT:
            console.log('You swiped right!');
        break;
    }
  }
 
  render() {
 
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
 
    return (
      <GestureRecognizer
        onSwipe={this.onSwipe}
        onSwipeUp={this.onSwipeUp}
        onSwipeDown={this.onSwipeDown}
        onSwipeLeft={this.onSwipeLeft}
        onSwipeRight={this.onSwipeRight}
        config={config}
        style={{
          height:200,
          backgroundColor: 'red'
        }}
        >
        <Text>{this.state.myText}</Text>
        <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
      </GestureRecognizer>
    );
  }
}
 
export default Example;