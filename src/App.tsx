/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { EndTripScreen, StartTripScreen, TripSummaryScreen } from './view/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MagicSheetPortal } from 'react-native-magic-sheet';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
export type MainStackParamList = {
  StartTripScreen: undefined;
  EndTripScreen: { tripStatupPointData: any };
  TripSummaryScreen: { summary: any };
};

const MainAppStack = createNativeStackNavigator<MainStackParamList>();

function App(): React.JSX.Element {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <MagicSheetPortal />
        <NavigationContainer  >
          {/* @ts-ignore */}
          <MainAppStack.Navigator >
            <MainAppStack.Screen name="StartTripScreen" component={StartTripScreen} options={{ headerShown: false }} />
            <MainAppStack.Screen name="EndTripScreen" component={EndTripScreen} options={{ headerShown: false }} />
            <MainAppStack.Screen name="TripSummaryScreen" component={TripSummaryScreen} options={{ headerShown: false }} />
          </MainAppStack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
