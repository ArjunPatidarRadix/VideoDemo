import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {MainStackParamList} from '../navigation/MainStack';
import {VIDEO_CALL_SCREEN} from '../utils/ScreenConstants';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'HomeScreen'>;

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [username, setUsername] = useState('');
  const navigateToVideoCall = () => {
    if (username.trim() !== '') {
      navigation.push(VIDEO_CALL_SCREEN, {username: username});
    } else {
      Alert.alert('USERNAME!!!', 'Please enter username to continue');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Username : </Text>
      <TextInput
        value={username}
        onChangeText={value => setUsername(value)}
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 10,
          padding: 10,
          width: 250,
        }}
        placeholder="Username"
      />
      <Button title={`Let's Go`} onPress={navigateToVideoCall} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
