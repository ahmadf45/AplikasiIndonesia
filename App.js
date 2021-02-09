import React, { Component } from 'react';
import HomeScreen from './src/pages/HomeScreen';
import Places from './src/pages/Places';
import Location from './src/pages/Location';
import MyLocation from './src/pages/MyLocation';
import Restaurant from './src/pages/Restaurant';
import Coffee from './src/pages/Coffee';
import Hotel from './src/pages/Hotel';
import Shopping from './src/pages/Shopping';


import{NavigationContainer} from '@react-navigation/native'
import{createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

export default class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Places" component={Places} options={{headerShown: false}}/>
          <Stack.Screen name="Location" component={Location} options={{headerShown: false}}/>
          <Stack.Screen name="MyLocation" component={MyLocation} options={{headerShown: false}}/>
          <Stack.Screen name="Restaurant" component={Restaurant} options={{headerShown: false}}/>
          <Stack.Screen name="Coffee" component={Coffee} options={{headerShown: false}}/>
          <Stack.Screen name="Hotel" component={Hotel} options={{headerShown: false}}/>
          <Stack.Screen name="Shopping" component={Shopping} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}