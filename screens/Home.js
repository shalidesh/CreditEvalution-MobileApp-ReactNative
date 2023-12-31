import { StyleSheet, Text, View ,Image,Alert,TouchableOpacity} from "react-native";
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import User from "../assets/user3.jpg"
import PriceEstimate from "./PriceEstimate";
import AutoFinance from "./AutoFinance";

import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function Home({ navigation }) {

  const [user, setUser] = useState("");

  useEffect(() => {

    const user = auth.currentUser;
    setUser(user);
    console.log(user.uid);      // prints the user's unique ID
    console.log(user.email);    // prints the user's email address


}, []);

  // Function to be called when the user clicks 'Logout'
  function handleLogout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            signOut(auth).catch(error => console.log('Error logging out: ', error));
          }
        }
      ]
    );
  }

  // Dummy screen component
  function LogoutScreen() {
    return <View />;
  }

  function handleNavigation(screenName) {
    navigation.reset({
      index: 0,
      routes: [{ name: screenName }],
    });
  }


  return (
    <Drawer.Navigator
        drawerContent={
          (props) => {
            return (
              <>
                <View
                  style={{
                    height: 200,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1
                  }}
                >
                  <Image
                    source={User}
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: 65
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 22,
                      marginVertical: 6,
                      fontWeight: "bold",
                      color: "#111"
                    }}
                  >{user.email}</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#111"
                    }}
                  >{user.uid}</Text>
                </View>
                <DrawerItemList {...props} />
              </>
            )
          }
        }
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250
          },
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          drawerLabelStyle: {
            color: "#111"
          }
        }}
      >
        
        <Drawer.Screen
          name="PriceEstimate"
          options={{
            drawerLabel: "Price Estimate",
            title: "Price Estimate",
            drawerIcon: () => (
              <TouchableOpacity onPress={() => handleNavigation('PriceEstimate')}>
                <SimpleLineIcons name="home" size={20} color="#808080" />
              </TouchableOpacity>
            ),
          }}
          component={PriceEstimate}
        />

      <Drawer.Screen
          name="AutoFinance"
          options={{
          name:"AutoFinance",
          drawerLabel: "Auto Finance",
            title: "Auto Finance",
            drawerIcon: () => (
              <TouchableOpacity onPress={() => handleNavigation('AutoFinance')}>
                <SimpleLineIcons name="home" size={20} color="#808080" />
              </TouchableOpacity>
            ),
          }}
          component={AutoFinance}
        />
         
      <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            drawerLabel: "Logout",
            title: "Logout",
            drawerIcon: () => (
              <TouchableOpacity>
                 <SimpleLineIcons name="logout" size={20} color="#808080" />
              </TouchableOpacity>
             
            )
          }}
          listeners={{
            focus: handleLogout,
          }}
        />
       
        
      </Drawer.Navigator>
  );

}

