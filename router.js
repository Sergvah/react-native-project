// import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen";

import { AntDesign } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createMaterialBottomTabNavigator();
// const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator labeled={false} barStyle={{ backgroundColor: '#f0f8ff', height: 80, borderWidth: 1,
    borderTopColor: "#dcdcdc", borderColor:'transparent'}}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: (focused, size, color) => (
            <AntDesign name="appstore-o" size={24} color="black"/>
          ),
        }}
        // options={{ tabBarLabel: false }} скрывает по отдельности название
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: (focused, size, color) => (
            <AntDesign name="pluscircle" size={24} color="black" />
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: (focused, size, color) => (
            <AntDesign name="user" size={24} color="black" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
export default useRoute