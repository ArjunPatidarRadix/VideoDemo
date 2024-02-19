import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/MainStack";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { LOGIN_SCREEN, MESSAGE_LIST_SCREEN } from "../utils/ScreenConstants";
import { ZIMKit, ConversationList } from "@zegocloud/zimkit-rn";
import { ChatListPopup } from "../components/ChatListPopup";
import { OneToOneChatModal } from "../components/OneToOneChatModal";
import { GroupChatModal } from "../components/GroupChatModal";
import { JoinGroupChatModal } from "../components/JoinGroupChatModal";

type ChatListScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "ChatListScreen"
>;

export const ChatListScreen = ({ navigation, route }: ChatListScreenProps) => {
  const { userID, userName } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [oneToOneModalVisible, setOneToOneModalVisible] = useState(false);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [joinGroupModalVisible, setJoinGroupModalVisible] = useState(false);

  const exit = () => {
    Alert.alert("Log Out", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        isPreferred: true,
      },
      {
        text: "Log out",
        onPress: () => {
          navigation.navigate(LOGIN_SCREEN);
          ZIMKit.disconnectUser();
        },
        style: "destructive",
      },
    ]);
  };
  const openMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const onModalMaskPress = () => {
    setMenuVisible(!menuVisible);
  };
  const onNewOneToOneChatPress = () => {
    setMenuVisible(!menuVisible);
    setOneToOneModalVisible(true);
  };
  const onNewGroupChatPress = () => {
    setMenuVisible(!menuVisible);
    setGroupModalVisible(true);
  };
  const onJoinGroupChatPress = () => {
    setMenuVisible(!menuVisible);
    setJoinGroupModalVisible(true);
  };
  const onOneToOneModalVisibleChanged = (
    visible: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOneToOneModalVisible(visible);
  };
  const onGroupModalVisibleChanged = (
    visible: boolean | ((prevState: boolean) => boolean)
  ) => {
    setGroupModalVisible(visible);
  };
  const onJoinGroupModalVisibleChanged = (
    visible: boolean | ((prevState: boolean) => boolean)
  ) => {
    setJoinGroupModalVisible(visible);
  };

  const onPressed = (props) => {
    const preMessageSending = (message: any) => {
      return message;
    };
    console.log("#######props", props);
    navigation.navigate(MESSAGE_LIST_SCREEN, {
      ...props,
      preMessageSending,
      appBarActions: [
        {
          icon: "goBack",
          onPressed: () => {
            navigation.goBack();
          },
        },
      ],
    });
  };

  const loadingBuilder = () => {
    return (
      <View style={styles.emptyView}>
        <ActivityIndicator />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <TouchableWithoutFeedback onPress={exit}>
          <Image
            style={styles.icon}
            source={require("../resources/icon-exit.png")}
          ></Image>
        </TouchableWithoutFeedback>
        <Text style={styles.title}>In-app Chat({`${userID}`})</Text>
        <View style={styles.utils}>
          <TouchableWithoutFeedback onPress={openMenu}>
            <Image
              style={styles.icon}
              source={require("../resources/icon-create.png")}
            ></Image>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <ChatListPopup
        visible={menuVisible}
        onModalMaskPress={onModalMaskPress}
        onNewOneToOneChatPress={onNewOneToOneChatPress}
        onNewGroupChatPress={onNewGroupChatPress}
        onJoinGroupChatPress={onJoinGroupChatPress}
      ></ChatListPopup>
      <OneToOneChatModal
        dialogVisible={oneToOneModalVisible}
        onDialogVisibleChanged={onOneToOneModalVisibleChanged}
      ></OneToOneChatModal>
      <GroupChatModal
        dialogVisible={groupModalVisible}
        onDialogVisibleChanged={onGroupModalVisibleChanged}
      ></GroupChatModal>
      <JoinGroupChatModal
        dialogVisible={joinGroupModalVisible}
        onDialogVisibleChanged={onJoinGroupModalVisibleChanged}
      ></JoinGroupChatModal>
      <View style={styles.conversation}>
        <ConversationList
          onPressed={onPressed}
          loadingBuilder={loadingBuilder}
        ></ConversationList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  title: {
    marginLeft: 18,
    fontSize: 18,
    fontWeight: "bold",
  },
  utils: {
    flexDirection: "row",
  },
  icon: {
    width: 36,
    height: 36,
  },
  inputBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  input: {
    paddingHorizontal: 20,
    width: "90%",
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  conversation: {
    flex: 1,
    width: "100%",
  },
  errorView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
