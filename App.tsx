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

// import * as dotenv from 'dotenv';
// dotenv.config();

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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NhostReactProvider nhost={nhost}>
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