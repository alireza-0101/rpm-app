import {
  FlatList,
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
    let last_passwords_json = await AsyncStorage.getItem(StorageKeys.passwords)
    let last_passwords = await JSON.parse(last_passwords_json)

    let new_password = {
      id: `RPM_${Date.now()}`,
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background,
        padding: 20,
        gap: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 40,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Add Password
      </Text>

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
    </View>
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
