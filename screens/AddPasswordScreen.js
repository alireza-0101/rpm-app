import {
  FlatList,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native"
import Colors from "../constant/Colors"
import { HeaderLeft, HeaderRight } from "../components/Header"
import Input from "../components/Input"
import { useCallback, useEffect, useReducer } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import StorageKeys from "../constant/StorageKeys"
import InputNote from "../components/InputNote"

const SET_INPUT = "SET_INPUT"
const RESET_INPUTS = "RESET_INPUTS"

const reducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT: {
      return {
        ...state,
        [action.id]: action.value,
      }
    }

    case RESET_INPUTS: {
      return {
        title: "",
        username: "",
        password: "",
      }
    }

    default: {
      return state
    }
  }
}

export default function AddPasswordScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    username: "",
    password: "",
  })

  const inputChangeHandler = useCallback(
    (id, value) => {
      dispatch({ type: SET_INPUT, id, value })
    },
    [dispatch]
  )

  const goToList = () => {
    navigation.navigate("PasswordList")
  }

  const submitDetailes = async () => {
    if (
      !state.title.trim() ||
      !state.username.trim() ||
      !state.password.trim()
    ) {
      ToastAndroid.show("Insert Value!", ToastAndroid.SHORT)
      return false
    }

    let last_passwords_json = await AsyncStorage.getItem(StorageKeys.passwords)
    let last_passwords = await JSON.parse(last_passwords_json)

    let new_password = {
      id: `RPM_${Date.now() * Math.floor(Math.random() * 10000)}`,
      title: state.title,
      username: state.username,
      password: state.password,
    }

    let new_passwords_arr = last_passwords ? [...last_passwords] : []
    new_passwords_arr.push(new_password)

    let new_passwords_arr_json = JSON.stringify(new_passwords_arr)

    await AsyncStorage.setItem(StorageKeys.passwords, new_passwords_arr_json)

    goToList()
    dispatch({ type: RESET_INPUTS })
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
      contentContainerStyle={{
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        minHeight: "100%",
        gap: 20,
      }}
    >
      <InputNote
        icon="warning-outline"
        title="Warning"
        backgroundColor={Colors.light_red}
        content="We do not have your passwords and as i said them save in your device, so when you uninstall our app, all of your passwords cleared from your device! be careful"
      />

      <InputNote icon="add-circle-outline" title="Add New password" />

      <Input
        title="Password Title"
        value={state.title}
        id="title"
        setValue={inputChangeHandler}
      />

      <Input
        title="Username OR Email"
        value={state.username}
        id="username"
        setValue={inputChangeHandler}
        keyboardType="email-address"
      />

      <Input
        title="Password"
        value={state.password}
        id="password"
        setValue={inputChangeHandler}
        keyboardType="visible-password"
      />

      <TouchableOpacity
        onPress={submitDetailes}
        style={{
          backgroundColor: Colors.primary,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Insert Password
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export const screenOptions = {
  drawerPosition: "right",
  headerLeft: HeaderLeft,
  headerStyle: {
    backgroundColor: Colors.header,
  },
  headerTitle: "",
  headerRight: HeaderRight,
  headerBackButtonMenuEnabled: false,
}
