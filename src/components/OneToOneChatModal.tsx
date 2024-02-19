import {
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MESSAGE_LIST_SCREEN } from "../utils/ScreenConstants";
import React from "react";
import { MainStackParamList } from "../navigation/MainStack";

export const OneToOneChatModal = (props: {
  dialogVisible: any;
  onDialogVisibleChanged: any;
}) => {
  const { dialogVisible, onDialogVisibleChanged } = props;
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [userID, setUserID] = useState("");
  useEffect(() => {
    setUserID("");
  }, [dialogVisible]);

  const onConfirmPress = () => {
    if (userID) {
      onDialogVisibleChanged(false);
      navigation.navigate(MESSAGE_LIST_SCREEN, {
        conversationID: userID,
        conversationName: userID,
        conversationType: 0,
        appBarActions: [
          {
            icon: "goBack",
            onPressed: () => {
              navigation.goBack();
            },
          },
        ],
      });
    }
  };

  const onCancelPress = () => {
    onDialogVisibleChanged(false);
  };

  return (
    <Modal transparent={true} visible={dialogVisible} animationType="fade">
      <View style={styles.modalMask}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.title}>New Chat</Text>
            <TextInput
              style={styles.input}
              placeholder="User ID"
              value={userID}
              onChangeText={(text) => setUserID(text)}
            ></TextInput>
            <View style={styles.btnBox}>
              <Button title="Cancel" onPress={onCancelPress}></Button>
              <Button title="OK" onPress={onConfirmPress}></Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalMask: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    justifyContent: "center",
    backgroundColor: "white",
    width: "80%",
    borderRadius: 8,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    marginRight: 10,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
