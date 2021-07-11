// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Portal } from "react-native-paper";

import HomeScreen from './src/screens/home'
import BookingScreen from "./src/screens/booking";
import AppointmentScreen from './src/screens/appointment'

const Stack = createStackNavigator();

function App() {
  return (
    <Portal.Host>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#404040",
            },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Booking"
            component={BookingScreen}
          />
          <Stack.Screen
            name="Appointments"
            component={AppointmentScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Portal.Host>
  );
}

export default App;
