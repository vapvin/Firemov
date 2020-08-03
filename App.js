import React, {useState} from 'react';
import {AppLoading} from "expo";
import { Image } from "react-native";
import {Asset} from "expo-asset";

const cacheImages = (images) => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image);
  }else{
    return Asset.fromModule(image).downloadAsync();
  }
});

export default function App() {
  const [ready, setReady] = useState(false);
  const loadAssets = async () => {
    const images = cacheImages([
        "https://images.unsplash.com/photo-1596431810482-2aa5de12ee5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        require("./assets/splash.png")
    ]);
    console.log(images);
  };
  const onFinish = () => setReady(true);
  return (
    ready ? null : <AppLoading startAsync={loadAssets} onFinish={onFinish} onError={console.error} />
  );
}

