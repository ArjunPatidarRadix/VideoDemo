import React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

export const ChatListPopup = (props: {
  visible: any;
  onModalMaskPress: any;
  onNewOneToOneChatPress: any;
  onNewGroupChatPress: any;
  onJoinGroupChatPress: any;
}) => {
  const {
    visible,
    onModalMaskPress,
    onNewOneToOneChatPress,
    onNewGroupChatPress,
    onJoinGroupChatPress,
  } = props;
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onModalMaskPress}>
        <View style={styles.modalMask}></View>
      </TouchableWithoutFeedback>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={onNewOneToOneChatPress}>
          <View style={[styles.modalItem, styles.borderBottom]}>
            <Text style={styles.text}>One-on-one Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNewGroupChatPress}>
          <View style={[styles.modalItem, styles.borderBottom]}>
            <Text style={styles.text}>Group Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onJoinGroupChatPress}>
          <View style={styles.modalItem}>
            <Text style={styles.text}>Join a group</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalMask: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    zIndex: 2,
    position: "absolute",
    bottom: 10,
    justifyContent: "center",
    backgroundColor: "white",
    width: "95%",
    borderRadius: 20,
    alignSelf: "center",
  },
  modalItem: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  text: {
    padding: 10,
    textAlign: "center",
    fontSize: 16,
  },
});
