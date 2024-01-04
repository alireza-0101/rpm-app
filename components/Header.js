import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons"
import React from "react"
import {
  Button,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native"
import Colors from "../constant/Colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export function HeaderLeft() {
  const pressOnLogo = () => {
    const ONE_SECOND_IN_MS = 50

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    ToastAndroid.show("RPM - Password Manager", ToastAndroid.SHORT)
    Vibration.vibrate(PATTERN)
  }

  return (
    <TouchableOpacity
      onPress={pressOnLogo}
      style={{
        flexDirection: "row",
        gap: 10,
      }}
    >
      <FontAwesome5 name="lock" size={24} color={Colors.primary} />
      <Text
        style={{
          color: Colors.primary,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        RPM
      </Text>
    </TouchableOpacity>
  )
}

export function HeaderRight() {

  const navigation = useNavigation()

  const navigateToSetting = () => {
    const ONE_SECOND_IN_MS = 50

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    Vibration.vibrate(PATTERN)
  }

  const logOut = async () => {
    const ONE_SECOND_IN_MS = 50

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    Vibration.vibrate(PATTERN)

    await AsyncStorage.clear()

    navigation.push("Login")
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 15,
      }}
    >
      <TouchableOpacity onPress={navigateToSetting}>
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={logOut}>
        <MaterialIcons name="logout" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}
