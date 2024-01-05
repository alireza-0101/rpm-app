import {
  FlatList,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native"
import Colors from "../constant/Colors"
import { HeaderLeft, HeaderRight } from "../components/Header"
import Input from "../components/Input"
import { useCallback, useEffect, useReducer } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import StorageKeys from "../constant/StorageKeys"
import { Ionicons } from "@expo/vector-icons"
import * as Clipboard from "expo-clipboard"

const SET_INPUT = "SET_INPUT"
const SET_DETAILES = "SET_DETAILES"
const RESET_INPUTS = "RESET_INPUTS"

const reducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT: {
      return {
        ...state,
        [action.id]: action.value,
      }
    }

    case SET_DETAILES: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        pin: action.pin,
      }
    }

    case RESET_INPUTS: {
      return {
        ...state,
        importText: "",
      }
    }

    default: {
      return state
    }
  }
}

export default function SettingsScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    pin: "",
    importText: "",
  })

  const inputChangeHandler = useCallback(
    (id, value) => {
      dispatch({ type: SET_INPUT, id, value })
    },
    [dispatch]
  )

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

  const goToList = () => {
    navigation.navigate("PasswordList")
  }

  const getDetailes = async () => {
    const name = await AsyncStorage.getItem(StorageKeys.name)
    const email = await AsyncStorage.getItem(StorageKeys.email)
    const pin = await AsyncStorage.getItem(StorageKeys.pin)

    dispatch({ type: SET_DETAILES, name, email, pin })
  }

  const submitDetailes = async () => {
    if (
      state.name.trim() != "" &&
      state.email.trim() != "" &&
      state.pin.length >= 4 &&
      state.email.includes("@")
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

  const afterImport = () => {
    const ONE_SECOND_IN_MS = 50

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    ToastAndroid.show("Replaced successfully!", ToastAndroid.SHORT)
    Vibration.vibrate(PATTERN)

    goToList()
    dispatch({ type: RESET_INPUTS })
  }

  const replaceData = async () => {
    if (!state.importText.trim()) {
      ToastAndroid.show("Insert Value!", ToastAndroid.SHORT)
      return false
    }

    await AsyncStorage.setItem(StorageKeys.passwords, state.importText)

    afterImport()
  }

  const importData = async () => {
    if (!state.importText.trim()) {
      ToastAndroid.show("Insert Value!", ToastAndroid.SHORT)
      return false
    }

    let last_passwords_json = await AsyncStorage.getItem(StorageKeys.passwords)
    let last_passwords = await JSON.parse(last_passwords_json)
    let imported_passwords = JSON.parse(state.importText)

    if (!last_passwords) {
      replaceData()
      return false
    }

    let new_passwords_arr = [...last_passwords, ...imported_passwords]

    let new_passwords_arr_json = JSON.stringify(new_passwords_arr)

    await AsyncStorage.setItem(StorageKeys.passwords, new_passwords_arr_json)

    afterImport()
  }

  const exportData = async () => {
    let passwords_json = await AsyncStorage.getItem(StorageKeys.passwords)
    copyToClipboard(passwords_json)
  }

  const deleteAllPasswords = async () => {
    await AsyncStorage.removeItem(StorageKeys.passwords)

    const ONE_SECOND_IN_MS = 50

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    ToastAndroid.show("Your Passwords Deleted!", ToastAndroid.SHORT)
    Vibration.vibrate(PATTERN)

    goToList()
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

    navigation.replace("Login")
  }

  useEffect(() => {
    const focused = navigation.addListener("focus", () => {
      getDetailes()
    })

    return focused
  }, [navigation])

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 30,
          backgroundColor: Colors.header,
          borderRadius: 10,
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 8,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name="attach" size={25} color={Colors.text} />

          <Text
            style={{
              color: Colors.light_text,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Edit Your Login Detailes
          </Text>
        </View>

        <Input
          title="Your Name"
          value={state.name}
          id="name"
          setValue={inputChangeHandler}
          customTitleColor={Colors.header}
        />

        <Input
          title="Restore Email"
          value={state.email}
          id="email"
          setValue={inputChangeHandler}
          keyboardType="email-address"
          customTitleColor={Colors.header}
        />

        <Input
          title="Your Pin"
          value={state.pin}
          id="pin"
          setValue={inputChangeHandler}
          keyboardType="numeric"
          customTitleColor={Colors.header}
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
            Submit Edits
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 30,
          backgroundColor: Colors.header,
          borderRadius: 10,
          gap: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 8,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="md-document-text-outline"
            size={25}
            color={Colors.text}
          />

          <Text
            style={{
              color: Colors.light_text,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Import Passwords
          </Text>
        </View>

        <Input
          title="Import Text"
          value={state.importText}
          id="importText"
          setValue={inputChangeHandler}
          customTitleColor={Colors.header}
          multiline
        />

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={importData}
            style={{
              backgroundColor: Colors.primary,
              padding: 12,
              borderRadius: 8,
              marginTop: 10,
              flex: 1,
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
              Import
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={replaceData}
            style={{
              backgroundColor: Colors.red,
              padding: 12,
              borderRadius: 8,
              marginTop: 10,
              flex: 1,
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
              Replace
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 30,
          backgroundColor: Colors.header,
          borderRadius: 10,
          gap: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 8,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name="receipt-outline" size={25} color={Colors.text} />

          <Text
            style={{
              color: Colors.light_text,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Export Passwords
          </Text>
        </View>

        <TouchableOpacity
          onPress={exportData}
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
            Run Export Now!
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 30,
          backgroundColor: Colors.light_red,
          borderRadius: 10,
          gap: 20,
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 8,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name="body-outline" size={25} color={Colors.text} />

          <Text
            style={{
              color: Colors.text,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Account Managing
          </Text>
        </View>

        <TouchableOpacity
          onPress={deleteAllPasswords}
          style={{
            backgroundColor: Colors.red,
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
            Delete All Passwords!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logOut}
          style={{
            backgroundColor: Colors.red,
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
            Delete Your Account!
          </Text>
        </TouchableOpacity>
      </View>
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
