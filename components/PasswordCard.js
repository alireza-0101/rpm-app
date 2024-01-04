import React from "react"
import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native"
import Colors from "../constant/Colors"
import { Ionicons } from "@expo/vector-icons"
import * as Clipboard from "expo-clipboard"

export default function PasswordCard({ title, username, password }) {
  const copyToClipboard = async (value) => {
    const ONE_SECOND_IN_MS = 50

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    await Clipboard.setStringAsync(value)
    ToastAndroid.show("Copied successfully!", ToastAndroid.SHORT)
    Vibration.vibrate(PATTERN)
  }

  return (
    <View
      style={{
        backgroundColor: Colors.header,
        width: "100%",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        gap: 15,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
          backgroundColor: Colors.background,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {username}
        </Text>

        <TouchableOpacity onPress={() => copyToClipboard(username)}>
          <Ionicons name="copy-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {password}
        </Text>

        <TouchableOpacity onPress={() => copyToClipboard(password)}>
          <Ionicons name="copy-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
