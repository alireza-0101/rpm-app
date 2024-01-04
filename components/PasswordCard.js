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

export default function PasswordCard({
  id,
  title,
  username,
  password,
  onDelete,
}) {
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
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Ionicons name="lock-open-outline" size={24} color={Colors.text} />

        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={() => onDelete(id)}>
            <Ionicons name="trash-outline" size={20} color={Colors.red} />
          </TouchableOpacity>

          <Text
            style={{
              color: Colors.text,
              fontWeight: "bold",
              fontSize: 22,
            }}
          >
            {title}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 20,
          backgroundColor: Colors.light_background,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: Colors.text,
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {username}
        </Text>

        <TouchableOpacity onPress={() => copyToClipboard(username)}>
          <Ionicons name="copy-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 20,
          backgroundColor: Colors.light_background,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: Colors.text,
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {password}
        </Text>

        <TouchableOpacity onPress={() => copyToClipboard(password)}>
          <Ionicons name="copy-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
