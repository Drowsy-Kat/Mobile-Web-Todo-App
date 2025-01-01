import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000000", // Tab bar background set to black
          borderTopWidth: 1, // Optional: Set the border thickness
          borderTopColor: "rgb(12, 12, 12)", // Change the colour of the line (red in this case)
        },

        tabBarBackground: () => (
          <View
            style={{
              backgroundColor: "rgb(22, 22, 22)",
              flex: 1,
              border: 0,
              margin: 0,
            }}
          />
        ),

        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopColor: "rgb(12, 12, 12)",
          },
          android: {
            borderTopWidth: 0,
          },
          default: {
            borderTopColor: "rgb(12, 12, 12)",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todo",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="check-circle" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Stream"
        options={{
          title: "Stream",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="check-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
