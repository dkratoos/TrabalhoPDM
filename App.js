import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import HomeScreen from './components/homeScreen'
import Produto from './components/produto/read'

Icon.loadFont()

const mainNavigation = createMaterialBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="lock" size={20} color={focused ? '#fff' : '#ddd'} />
        ),
      }),
    },
    Produto: {
      screen: Produto,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Icon name="rocket" size={20} color={focused ? '#fff' : '#ddd'} />
        ),
      }),
    }
  },
  {
    barStyle: {
      backgroundColor: '#7159c1',
    }
  }
);

export default createAppContainer(mainNavigation)