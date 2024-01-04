import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons"
import React, { useReducer } from "react"
import {
  Button,
  Modal,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from "react-native"
import Colors from "../constant/Colors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const SET_SHOW_MENU = "SET_SHOW_MENU"

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SHOW_MENU: {
      return {
        ...state,
        isOpenMenu: action.value,
      }
    }

    default: {
      return state
    }
  }
}

export function HeaderLeft() {
  const pressOnLogo = () => {
    const ONE_SECOND_IN_MS = 50

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    ToastAndroid.show("RPM Version 1.0.0", ToastAndroid.SHORT)
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

  const [state, dispatch] = useReducer(reducer, {
    isOpenMenu: false,
  })

  const openMenu = () => {
    dispatch({
      type: SET_SHOW_MENU,
      value: true,
    })
  }

  const clodeMenu = () => {
    dispatch({
      type: SET_SHOW_MENU,
      value: false,
    })
  }

  const navigateToSetting = () => {
    clodeMenu()
  }

  const navigateToList = () => {
    clodeMenu()
    navigation.navigate("PasswordList")
  }

  const navigateToAddNew = () => {
    clodeMenu()
    navigation.navigate("AddPassword")
  }

  const lock = () => {
    clodeMenu()
    navigation.replace("Pin")
  }

  const logOut = async () => {
    clodeMenu()

    const ONE_SECOND_IN_MS = 50

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    Vibration.vibrate(PATTERN)

    await AsyncStorage.clear()

    navigation.replace("Login")
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="menu" size={30} color={Colors.text} />
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={state.isOpenMenu}>
        <TouchableOpacity
          onPress={clodeMenu}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#00000080",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                width: "100%",
                backgroundColor: Colors.header,
                height: "auto",
                padding: 20,
                gap: 10,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                onPress={navigateToAddNew}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 8,
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  backgroundColor: Colors.light_background,
                  borderRadius: 10,
                }}
              >
                <View>
                  <Ionicons
                    name="add-circle-outline"
                    size={22}
                    color={Colors.text}
                  />
                </View>

                <Text
                  style={{
                    color: Colors.text,
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  New Password
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={navigateToList}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 8,
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  backgroundColor: Colors.light_background,
                  borderRadius: 10,
                }}
              >
                <View>
                  <Ionicons name="list" size={22} color={Colors.text} />
                </View>

                <Text
                  style={{
                    color: Colors.text,
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Password List
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={navigateToSetting}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 8,
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  backgroundColor: Colors.light_background,
                  borderRadius: 10,
                }}
              >
                <View>
                  <Ionicons
                    name="settings-outline"
                    size={22}
                    color={Colors.text}
                  />
                </View>

                <Text
                  style={{
                    color: Colors.text,
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={lock}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 8,
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  backgroundColor: Colors.light_background,
                  borderRadius: 10,
                }}
              >
                <View>
                  <Ionicons
                    name="md-lock-closed-outline"
                    size={22}
                    color={Colors.text}
                  />
                </View>

                <Text
                  style={{
                    color: Colors.text,
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Lock App
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={logOut}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 8,
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  backgroundColor: Colors.light_red,
                  borderRadius: 10,
                }}
              >
                <View>
                  <Ionicons
                    name="log-out-outline"
                    size={22}
                    color={Colors.text}
                  />
                </View>

                <Text
                  style={{
                    color: Colors.text,
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={clodeMenu}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 8,
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: Colors.light_background,
                  borderRadius: 10,
                }}
              >
                <View>
                  <Ionicons name="chevron-down" size={40} color={Colors.text} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  )
}
