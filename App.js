import React from "react";
import { Provider } from "react-redux";
// import "react-native-gesture-handler";
import { store } from "./redux/store";
import Main from './components/Main'

// import { StyleSheet} from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading"
import { useState } from "react";

const loadApp = async () => {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
};


export default function App() {
  const [isReady, setIsReady] = useState(false);
    
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
    <Provider store={store}>
     <Main/>
      </Provider>
    </>
  );
}

