import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./navigation/Stack";


const preLoadImages = (images) => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image);
  }else{
    return Asset.fromModule(image).downloadAsync();
  }
});

const preLoadFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default function App() {
  const [ready, setReady] = useState(false);
  const loadAssets = async () => {
    const images = preLoadImages([
        "https://images.unsplash.com/photo-1596431810482-2aa5de12ee5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        require("./assets/splash.png")
    ]);
    const fonts = preLoadFonts([Ionicons.font]);
    return Promise.all([...images, ...fonts]);
  };
  const onFinish = () => setReady(true);
    return ready ? (
        <>
            <NavigationContainer>
                <Stack />
            </NavigationContainer>
            <StatusBar barStyle="light-content" />
        </>
    ) : (
        <AppLoading
            startAsync={loadAssets}
            onFinish={onFinish}
            onError={console.error}
        />
    );
}

