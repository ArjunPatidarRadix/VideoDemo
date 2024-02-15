import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME_SCREEN, VIDEO_CALL_SCREEN} from '../utils/ScreenConstants';
import {HomeScreen} from '../screens/HomeScreen';
import {VideoCallScreen} from '../screens/VideoCallScreen';
export type MainStackParamList = {
  HomeScreen: undefined;
  VideoCallScreen: {username: string};
};
export const MainStack = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator initialRouteName={HOME_SCREEN}>
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={VIDEO_CALL_SCREEN} component={VideoCallScreen} />
    </Stack.Navigator>
  );
};
