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
import { ZIMKit } from "@zegocloud/zimkit-rn";
import { MESSAGE_LIST_SCREEN } from "../utils/ScreenConstants";
import React from "react";
import { MainStackParamList } from "../navigation/MainStack";

export const GroupChatModal = (props: {
  dialogVisible: any;
  onDialogVisibleChanged: any;
}) => {
  const { dialogVisible, onDialogVisibleChanged } = props;
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const [groupName, setGroupName] = useState("");
  const [userIDs, setUserIDs] = useState("");
  useEffect(() => {
    setGroupName("");
    setUserIDs("");
  }, [dialogVisible]);

  const onConfirmPress = () => {
    if (groupName) {
      onDialogVisibleChanged(false);
      const userIDsArr = userIDs.split(";");
      ZIMKit.createGroup(groupName, userIDsArr).then((data) => {
        if (!data.code) {
          const { groupInfo, errorUserList } = data;
          const { baseInfo } = groupInfo;
          navigation.navigate(MESSAGE_LIST_SCREEN, {
            conversationID: baseInfo.groupID,
            conversationName: baseInfo.groupName,
            conversationType: 2,
            appBarActions: [
              {
                icon: "goBack",
                onPressed: () => {
                  navigation.goBack();
                },
              },
            ],
          });
          // }
        }
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
            <Text style={styles.title}>New Group Chat</Text>
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={groupName}
              onChangeText={(text) => setGroupName(text)}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Group member IDs, separated by ';'"
              value={userIDs}
              onChangeText={(text) => setUserIDs(text)}
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
