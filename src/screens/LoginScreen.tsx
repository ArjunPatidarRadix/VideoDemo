import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { ZIMKit } from "@zegocloud/zimkit-rn";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/MainStack";
import { CHAT_LIST_SCREEN, HOME_SCREEN } from "../utils/ScreenConstants";
import { chatConfig } from "../utils/KeyCenter";

type LoginScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "LoginScreen"
>;

export const LoginScreen = ({ navigation, route }: LoginScreenProps) => {
  const [userID, setUserId] = useState("");
  const [userName, setUsername] = useState("");

  useEffect(() => {
    ZIMKit.init(chatConfig.appID, chatConfig.appSign);
  }, []);

  const navigateToHomeScreen = async () => {
    if (userID !== "" && userName !== "") {
      // ZIMKit.disconnectUser();
      ZIMKit.connectUser({ userID: userID, userName: userName }, "").then(
        (data: string) => {
          // sdk failed callback is [Error: login failed], no code.
          console.log("data :: ", data);
          if (data === userID) {
            navigation.navigate(CHAT_LIST_SCREEN, {
              userID: userID,
              userName: userName,
            });
          } else {
            console.log("not working");
          }
        }
      );
    } else {
      Alert.alert("❌", "Please enter both to continue");
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.textStyle}>User ID : </Text>
        <TextInput
          placeholder="Enter User ID"
          style={styles.TextInputStyle}
          onChangeText={(value) => setUserId(value)}
          value={userID}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textStyle}>Username : </Text>
        <TextInput
          placeholder="Enter Username"
          style={styles.TextInputStyle}
          onChangeText={(value) => setUsername(value)}
          value={userName}
        />
      </View>
      <Button title={`Let's Go`} onPress={navigateToHomeScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    marginTop: 10,
  },
  TextInputStyle: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: 250,
    borderRadius: 10,
  },
});
