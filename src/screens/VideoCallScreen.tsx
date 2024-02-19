// App.js
import React from "react";
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/MainStack";
import { HOME_SCREEN } from "../utils/ScreenConstants";
import { videoConfig } from "../utils/KeyCenter";

type VideoCallScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "VideoCallScreen"
>;

export const VideoCallScreen = ({
  route,
  navigation,
}: VideoCallScreenProps) => {
  const username = route.params.username;
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={videoConfig.appID}
        appSign={videoConfig.appSign}
        userID={username} // userID can be something like a phone number or the user id on your own user system.
        userName={username}
        callID={"testingCallID"} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            navigation.navigate(HOME_SCREEN);
          },
          onHangUp: () => {
            navigation.navigate(HOME_SCREEN);
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
