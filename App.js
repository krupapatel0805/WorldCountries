import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import FavouritesList from './Screens/FavouriteList';
import CountriesList from './Screens/WorldCountiresList';
import DetailsScreen from './Screens/CountryDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigation for countries list and details 
const CountriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Countries" component={CountriesList} />
      <Stack.Screen name="CountryDetails" component={DetailsScreen} />
    </Stack.Navigator>
  );
};


// Tab navigation for displaying main screen 
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="List"
          component={CountriesStack}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="list" size={20} color={"blue"} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouritesList}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="heart" color={"blue"} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

