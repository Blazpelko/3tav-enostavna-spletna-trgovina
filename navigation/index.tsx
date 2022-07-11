/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable  } from "native-base";
  
import NotFoundScreen from '../screens/NotFoundScreen';
import Store from '../screens/Store';
import Basket from '../screens/Basket';
import FormScreen from '../screens/FormScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import {  Icon } from "native-base";
import { Feather,FontAwesome5} from "@expo/vector-icons";

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

//Vnos podatkov naročnika
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="FormScreen" component={FormScreen} options={{ title: 'Vnos podatkov naročnika' }}/> 
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Store">
      <BottomTab.Screen
        name="Store"
        component={Store}
        options={({ navigation }: RootTabScreenProps<'Store'>) => ({
          title: 'Store',
          tabBarIcon: ()=><Icon as={Feather} name="shopping-bag" size="md" color="black" />,
        })}
      />
      <BottomTab.Screen
        name="Basket"
        component={Basket}
        options={{
          title: 'Basket',
          tabBarIcon: ()=> <Icon as={Feather} name="shopping-cart" size="md" color="black"/>,
        }}
      />
    </BottomTab.Navigator>
  );
}