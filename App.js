import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { FadeIn, FadeOut } from 'react-native-reanimated';

import LoginScreen from '@pages/login/Login';
import Signup from '@pages/signup/Signup';
import CustomerHomeScreen from '@pages/customer/HomeScreen/HomeScreen';
import WashForm from '@pages/customer/Formwash/WashForm';
import Settings from '@pages/Settings/Settings';
import WashFormReadOnly from '@pages/customer/Formwash/ShowWashForm';
import WasherSelectionScreen from '@pages/customer/menu/washerMenu';
import Vehiclelist from '@pages/vehicle/vehcilelist';
import UserProfile from '@pages/profile/Userprofile';
import BalanceScreen from '@pages/customer/Balance/BalanceScreen';
import Notificationuser from '@pages/Notifications/Notificationuser';
import TipsScreen from './components/Tips/Tipscreen';
import LoaderScreen from '@pages/Welcome/Loader';
import ScheduleCard from '@pages/schedule/ScheduleCard';
import FeedbackScreen from '@pages/feedback/feedback';
import FAQScreen from '@pages/FAQ/faq';
import AddVehicleScreen from '@pages/vehicle/vehicleadd';
import PaymentcontinueScreen from '@pages/customer/Balance/PaymentScreen';
import TaskView from '@pages/schedule/Taskupdate';
import DeletePage from '@pages/Delete/DeleteAccount';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

// const transitionConfig = {
//   gestureEnabled: true,
//   transitionSpec: {
//     open: {
//       animation: 'timing',
//       config: {
//         duration: 500,
//       },
//     },
//     close: {
//       animation: 'timing',
//       config: {
//         duration: 500,
//       },
//     },
//   },
//   cardStyleInterpolator: ({ current, next, layouts }) => {
//     const progress = Animated.add(current.progress, next ? next.progress : 0);
//     return {
//       cardStyle: {
//         opacity: progress.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, 1],
//         }),
//       },
//     };
//   },
// };

function CustomerHomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} initialRouteName='Home'>
      <Stack.Screen name="Home" component={CustomerHomeScreen} />
      <Stack.Screen name="WashForm" component={WashForm} />
      <Stack.Screen name="WashFormReadOnly" component={WashFormReadOnly} />
      <Stack.Screen name="WasherSelection" component={WasherSelectionScreen} />
      <Stack.Screen name="VehicleList" component={Vehiclelist} />
      <Stack.Screen name="Notification" component={Notificationuser} />
      <Stack.Screen name="Tips" component={TipsScreen} />
      <Stack.Screen name="ScheduleCard" component={ScheduleCard} />

    </Stack.Navigator>
  );
}

function BalanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Balance" component={BalanceScreen} />
      <Stack.Screen name="Paymentcontinue" component={PaymentcontinueScreen} />

    </Stack.Navigator>
  );
}


function ScheduleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Schedule" component={ScheduleCard} />
      <Stack.Screen name="Taskprogress" component={TaskView} />
    </Stack.Navigator>
  )
}




function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="FAQScreen" component={FAQScreen} />
      <Stack.Screen name="Addcar" component={AddVehicleScreen} />
      <Stack.Screen name="Viewcar" component={Vehiclelist} />
      <Stack.Screen name="DeleteAccount" component={DeletePage} />
    </Stack.Navigator>
  );
}

function RootTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: { backgroundColor: 'black' },
        tabBarLabelStyle: { color: 'white' },
      }}>
      <Tab.Screen name="Home" component={CustomerHomeStack} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Schedule" component={ScheduleStack} />

      <Tab.Screen name="Balance" component={BalanceStack} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="rupee" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Settings" component={SettingsStack} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-sharp" size={size} color={color} />
        )
      }} />
    </Tab.Navigator>
  );
}



function CustomRootTabs() {
  return (
    <>
      <Stack.Navigator initialRouteName='Loader' screenOptions={{
        // ...transitionConfig,
        headerShown: false
      }}>
        <Stack.Screen name="Loader" component={LoaderScreen} />
        <Stack.Screen name="Addcar" component={AddVehicleScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreen" component={RootTabs} />
        <Stack.Screen name="Paymentcontinue" component={PaymentcontinueScreen} />

      </Stack.Navigator>
    </>

  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <CustomRootTabs />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
