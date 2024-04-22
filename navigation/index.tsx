/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ActivityIndicator, ColorSchemeName, Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import UsersScreen from "../screens/UsersScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { useAuthenticationStatus } from "@nhost/react";
import OnboardingScreen from "../screens/Onboarding";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChatStackNavigator from "./ChatStackNavigator";
import ChatContextProvider from "../context/ChatContext";
import EventListScreen from "../screens/EventListScreen";
import MapsScreen from "../screens/MapsScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return <ActivityIndicator />;
  }

if (!isAuthenticated) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Onboarding" 
      component={OnboardingScreen} 
      options={{ headerShown: false }} />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Sign up" }}
      />
    </Stack.Navigator>
  );
}

return (
  <ChatContextProvider>
  <Stack.Navigator>
    <Stack.Screen
      name="Root"
      component={BottomTabNavigator}
      options={{ headerShown: false, title: "Home" }}
    />
    <Stack.Screen
      name="NotFound"
      component={NotFoundScreen}
      options={{ title: "Error" }}
    />
    <Stack.Screen
      name="Maps"
      component={MapsScreen}
      options={{ title: "Venue Map" }}
    />
    <Stack.Group screenOptions={{ presentation: "modal" }}>
      <Stack.Screen name="Modal" component={ModalScreen} options={{ title: "Event Details" }} />
      <Stack.Screen name="Users" component={UsersScreen} />
    </Stack.Group>
  </Stack.Navigator>
  </ChatContextProvider>
);

}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
    <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Maps")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="map"
                size={25}
                color={"dimgray"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen 
      name="Events"
      component={EventListScreen}
      options={{
        headerShown: false,
        tabBarIcon: () => (
          <MaterialIcons name="event" size={24} color="black" />
        ),
      }}
      />
      <BottomTab.Screen 
      name="Chat" 
      component={ChatStackNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="chatbox-ellipses-outline" size={25} color={color} />
        ),
      }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "My Account",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
