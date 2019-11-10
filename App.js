import * as React from 'react';
import {Easing,Animated } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
// import Login from './components/Login';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Main from './components/Main';
import calander from './components/calander';
import TaskDetails from './components/TaskDetails';
import Add from './components/Add';

// import Example from './components/Swiptest';
// import ProductScreen from './components/ProductScreen';
// import ProductDetailsScreen from './components/ProductDetailsScreen';
// import ProductAddScreen from './components/ProductAddScreen';
// import ProductEditScreen from './components/ProductEditScreen';

const AppNavigator = createStackNavigator(
  {
    Home,
    Schedule,
    Main,
    calander,
    TaskDetails,
    Add,
    // Example,
    // Product: ProductScreen,
    // ProductDetails: ProductDetailsScreen,
    // AddProduct: ProductAddScreen,
    // EditProduct: ProductEditScreen,
  },
  {
    
  initialRouteName: "Main",
  headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 600,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps;
                const {index} = scene;

                const width = layout.initWidth;
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [width, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return {opacity, transform: [{translateX: translateX}]};
            },
    })
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

