import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Databasetest';

const db = new Database();

export default class ProductAddScreen extends Component {
  static navigationOptions = {
    title: 'Add Product',
  };
  constructor() {
    super();
    this.state = {

     
      Location:'',
      
      errmsg:'',
      error:false,
      date: new Date(),

      taskId:'', taskName:'', taskDate:'', taskMonth:'', taskYear:'', taskTime:'', taskDesc:'', priority:'', dailyReminder:false, taskStatus:'scheduled', createdTime:'',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  saveProduct() {
    this.setState({
      isLoading: false,
    });
    let data = {
      taskId: this.state.prodId,
      taskName: this.state.taskName,
      taskDesc: this.state.taskDesc,
      taskDate: this.state.taskDate,
      taskMonth: this.state.taskMonth,
      taskYear: this.state.taskYear,
      taskTime: this.state.taskTime,
      taskStatus:this.state.taskStatus,
      dailyReminder:this.state.dailyReminder,
      priority:'normal',
      createdTime: 'new Date()'
    }
    db.addProduct(data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'TASK ID'}
              value={this.state.taskId}
              onChangeText={(text) => this.updateTextInput(text, 'taskId')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Task Name'}
              value={this.state.taskName}
              onChangeText={(text) => this.updateTextInput(text, 'taskName')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Task Description'}
              value={this.state.taskDesc}
              onChangeText={(text) => this.updateTextInput(text, 'taskDesc')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'priority'}
              value={this.state.priority}
              onChangeText={(text) => this.updateTextInput(text, 'priority')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'taskStatus'}
              value={this.state.taskStatus}
              keyboardType='numeric'
              onChangeText={(text) => this.updateTextInput(text, 'taskStatus')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.saveProduct()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})