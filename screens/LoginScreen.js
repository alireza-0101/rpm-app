import {
  Alert,
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

const reducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT: {
      return {
        ...state,
        [action.id]: action.value,
      }
    }

    default: {
      return state
    }
  }
}

export default function LoginScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    pin: "",
  })

  const inputChangeHandler = useCallback(
    (id, value) => {
      dispatch({ type: SET_INPUT, id, value })
    },
    [dispatch]
  )

  const submitDetailes = async () => {
    if (
      state.name.trim() &&
      state.pin.length >= 4 &&
      /^.+@\w+\.\w{2,3}$/g.test(state.email)
    ) {
      try {
        await AsyncStorage.setItem(StorageKeys.name, state.name)
        await AsyncStorage.setItem(StorageKeys.email, state.email)
        await AsyncStorage.setItem(StorageKeys.pin, state.pin)
        ToastAndroid.show("Your Detailes saved.", ToastAndroid.SHORT)

        navigation.replace("PasswordList")
      } catch (error) {
        ToastAndroid.show("Oh! Try Again...", ToastAndroid.SHORT)
        console.error(error)
      }
    } else {
      ToastAndroid.show("Write Your Currect Detailes!", ToastAndroid.SHORT)
    }
  }

  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      if (event.data.action.type === "GO_BACK") {
        event.preventDefault()
      }
    })
  }, [])

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
      <InputNote
        icon="body-outline"
        title="Welocome!"
        content="We will save your passwords in your device and no body can see that and your passwords do not share anywhere! don't worry"
      />

      <Input
        title="Your Name"
        value={state.name}
        id="name"
        setValue={inputChangeHandler}
      />

      <Input
        title="Restore Email"
        value={state.email}
        id="email"
        setValue={inputChangeHandler}
        keyboardType="email-address"
      />

      <Input
        title="Your Pin"
        value={state.pin}
        id="pin"
        setValue={inputChangeHandler}
        keyboardType="numeric"
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
          Get Start Now!
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
  headerBackButtonMenuEnabled: false,
}
