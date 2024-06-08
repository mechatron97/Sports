//client id: 801121607878-12dl2mposkdnhl6uqt0scr3u3hiva7ol.apps.googleusercontent.com
// web client id: 801121607878-uoev58u0ctpqfbqn00atq838qp0cr330.apps.googleusercontent.com
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NhostClient, NhostReactProvider } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

let subdomain = process.env.EXPO_PUBLIC_SUBDOMAIN;

const nhost = new NhostClient({
  subdomain: subdomain,
  region: 'us-east-1',
  clientStorageType: 'expo-secure-storage',
  clientStorage: SecureStore,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userInfo, setUserInfo] = React.useState(null);

  const [ request, response, promptAsync ] = Google.useAuthRequest({
    iosClientId: 
    "801121607878-12dl2mposkdnhl6uqt0scr3u3hiva7ol.apps.googleusercontent.com"
  })

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NhostReactProvider nhost={nhost} initial={undefined}>
        <NhostApolloProvider nhost={nhost}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
        </NhostApolloProvider>
      </NhostReactProvider>
      </GestureHandlerRootView>
    );
  }
}