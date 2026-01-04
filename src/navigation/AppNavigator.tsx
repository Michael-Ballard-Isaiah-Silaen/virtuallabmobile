import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import PhysicsScreen from '../screens/PhysicsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainTabs = () => {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if(route.name === 'Home'){
            iconName = focused ? 'home' : 'home-outline';
          } 
          else if(route.name === 'Physics'){
            iconName = focused ? 'flask' : 'flask-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00bf33',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Physics" component={PhysicsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const auth = useContext(AuthContext);
  return (
    <NavigationContainer>
      {auth?.userToken ? (
        <MainTabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;