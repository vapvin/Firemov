import React, {useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from "@expo/vector-icons";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import {Platform} from "react-native";

const Tabs = createBottomTabNavigator();

const getNames = route => route?.state?.routeNames[route.state.index] || "Movies";

export default ({navigation, route}) => {
    useLayoutEffect(() => {
        const name = getNames(route);
       navigation.setOptions({title: name });
    }, [route])
    return (
        <Tabs.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    let icons = Platform.OS === "ios" ? "ios-" : "md-";
                    if (route.name === "Movies") icons += "film";
                    if (route.name === "TV") icons += "tv";
                    if (route.name === "Search") icons += "search";
                    if (route.name === "Favourites") icons += "heart";


                    return <Ionicons name={icons} color={focused ? "white" : "grey"} size={26} />
                }
            })}
            tabBarOptions={{
            showLabel: false,
            style: {
                backgroundColor: "black",
                borderTopColor: "black",
            }
        }}>
            <Tabs.Screen name="Movies" component={Movies}/>
            <Tabs.Screen name="TV" component={TV}/>
            <Tabs.Screen name="Search" component={Search}/>
            <Tabs.Screen name="Favourites" component={Favs}/>
        </Tabs.Navigator>
    )
}

