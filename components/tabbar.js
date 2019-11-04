import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, SearchBar, TabBar } from '@ant-design/react-native';

export default class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'redTab',
    };
  }

  onChangeTab = (tabName) => {
    this.setState({
      selectedTab: tabName,
    });
    this.props.currentTab(tabName);
  }
  

  render() {
      console.log('props...',this.props)
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5"
      >
        <TabBar.Item
          title="Home"
          icon={<Icon name="appstore" />}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => this.onChangeTab('blueTab')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="ordered-list" />}
          title="Schedule"
          badge={2}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => this.onChangeTab('redTab')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="plus-square" />}
          title="Add new"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => this.onChangeTab('greenTab')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="Profile"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}
        >
        </TabBar.Item>
      </TabBar>
    );
  }
}
