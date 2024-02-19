import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CHAT_LIST_SCREEN,
  HOME_SCREEN,
  LOGIN_SCREEN,
  MESSAGE_LIST_SCREEN,
  VIDEO_CALL_SCREEN,
} from "../utils/ScreenConstants";
import { HomeScreen } from "../screens/HomeScreen";
import { VideoCallScreen } from "../screens/VideoCallScreen";
import { LoginScreen } from "../screens/LoginScreen";
import React from "react";
import { ChatListScreen } from "../screens/ChatListScreen";
import { MessageListPage } from "@zegocloud/zimkit-rn";

export type MainStackParamList = {
  HomeScreen: undefined;
  VideoCallScreen: { username: string };
  LoginScreen: undefined;
  ChatListScreen: { userID: string; userName: string };
  MessageListPage: any;
};
export const MainStack = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName={LOGIN_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={VIDEO_CALL_SCREEN} component={VideoCallScreen} />
      <Stack.Screen name={CHAT_LIST_SCREEN} component={ChatListScreen} />
      <Stack.Screen name={MESSAGE_LIST_SCREEN} component={MessageListPage} />
    </Stack.Navigator>
  );
};
