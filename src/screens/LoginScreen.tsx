import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {ZIMKit} from '@zegocloud/zimkit-rn';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainStack';
import {HOME_SCREEN} from '../utils/ScreenConstants';
import {chatConfig} from '../utils/KeyCenter';
import ZIM from 'zego-zim-react-native';

type LoginScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'LoginScreen'
>;

export const LoginScreen = ({navigation, route}: LoginScreenProps) => {
  const [userID, setUserId] = useState('');
  const [userName, setUsername] = useState('');

  useEffect(() => {
    ZIMKit.init(chatConfig.appID, chatConfig.appSign);
  }, []);

  const navigateToHomeScreen = async () => {
    if (userID !== '' && userName !== '') {
      // ZIMKit.disconnectUser();
      const token =
        '04AAAAAGXQrq0AEHdkZ2ZtN2IyMjlmZ2hwcHAAoKBLu2E3NDqe4ADy4NZE+zEyKf5xyClmrpFQ0p7PY14i5ZncaByHcQwzOSR6gz8a9WOqnGprlt8QuiiFaoR7sGMKnw1UlfLHbwxxLZN+2192P5OGQyghYA4TZIQOLYikweMV/h3RkhAmnAtp1yvzw+DDi4dxNkSd2nQ//MIpcNSrzQ/igsfcbQe5PrIAR8Gb2+aNOctdM5Rt4NTIuJySLe4=';
      //   ZIMKit.connectUser({userID: userID, userName: userName}, '').then(
      //     (data: string) => {
      //       // sdk failed callback is [Error: login failed], no code.
      //       console.log('data :: ', data);
      //       if (data === userID) {
      //         navigation.navigate(HOME_SCREEN, {
      //           userID: userID,
      //           userName: userName,
      //         });
      //       } else {
      //         console.log('not working');
      //       }
      //     },
      //   );
      const data = await ZIMKit.connectUser(
        {userID: userID, userName: userName},
        '',
      );
      console.log('data :: ', data);
    } else {
      Alert.alert('❌', 'Please enter both to continue');
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.textStyle}>User ID : </Text>
        <TextInput
          placeholder="Enter User ID"
          style={styles.TextInputStyle}
          onChangeText={value => setUserId(value)}
          value={userID}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textStyle}>Username : </Text>
        <TextInput
          placeholder="Enter Username"
          style={styles.TextInputStyle}
          onChangeText={value => setUsername(value)}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 10,
  },
  TextInputStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: 250,
    borderRadius: 10,
  },
});
