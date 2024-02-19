import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HOME_SCREEN,
  LOGIN_SCREEN,
  VIDEO_CALL_SCREEN,
} from '../utils/ScreenConstants';
import {HomeScreen} from '../screens/HomeScreen';
import {VideoCallScreen} from '../screens/VideoCallScreen';
import {LoginScreen} from '../screens/LoginScreen';
export type MainStackParamList = {
  HomeScreen: {userID: string; userName: string};
  VideoCallScreen: {username: string};
  LoginScreen: undefined;
};
export const MainStack = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator initialRouteName={LOGIN_SCREEN}>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={VIDEO_CALL_SCREEN} component={VideoCallScreen} />
    </Stack.Navigator>
  );
};
