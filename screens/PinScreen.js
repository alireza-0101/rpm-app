import {
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native"
import Colors from "../constant/Colors"
import { HeaderLeft } from "../components/Header"
import Input from "../components/Input"
import { useCallback, useEffect, useReducer } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import StorageKeys from "../constant/StorageKeys"
import { Ionicons } from "@expo/vector-icons"

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

export default function PinScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, {
    pin: "",
  })

  const inputChangeHandler = useCallback(
    (id, value) => {
      dispatch({ type: SET_INPUT, id, value })
    },
    [dispatch]
  )

  const submitPin = async (vibrate_mode) => {
    let userPin = await AsyncStorage.getItem(StorageKeys.pin)
    let insertedPin = state.pin

    if (insertedPin === userPin) {
      navigation.replace("PasswordList")
    } else {
      if (vibrate_mode === "NO_VIBRATE") {
        return false
      }

      const ONE_SECOND_IN_MS = 200

      const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS,
      ]

      Vibration.vibrate(PATTERN)
      inputChangeHandler("pin", "")
      ToastAndroid.show("It`s Wrong!", ToastAndroid.SHORT)
    }
  }

  const setNumber = (value) => {
    let must_insert = state.pin

    if (value === "ENTER") {
      submitPin()
      return false
    }

    if (value === "BACK_SPACE") {
      let deleted_item = state.pin.slice(-1)
      let new_value = state.pin.replace(deleted_item, "")
      must_insert = new_value
    } else {
      must_insert = `${state.pin}${value}`
    }

    inputChangeHandler("pin", `${must_insert}`)
  }

  useEffect(() => {
    if (state.pin.length >= 4) {
      submitPin("NO_VIBRATE")
    }
  }, [state.pin])

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
      <View
        style={{
          width: "100%",
          height: 100,
          paddingRight: 12,
          paddingLeft: 12,
          paddingTop: 16,
          paddingBottom: 16,
          borderColor: "#999",
          borderStyle: "solid",
          borderWidth: 2,
          borderRadius: 8,
          color: "#fff",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 40,
            textAlign: "center",
            marginBottom: 10,
            letterSpacing: 15,
          }}
        >
          {state.pin || "PIN CODE"}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          gap: 20,
          width: "100%",
          justifyContent: "space-evenly",
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(3)}
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
            3
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(2)}
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
            2
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(1)}
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
            1
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          gap: 20,
          width: "100%",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(6)}
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
            6
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(5)}
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
            5
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(4)}
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
            4
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          gap: 20,
          width: "100%",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(9)}
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
            9
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(8)}
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
            8
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(7)}
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
            7
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          gap: 20,
          width: "100%",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber("ENTER")}
        >
          <Ionicons name="arrow-forward" size={40} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber(0)}
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
            0
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.header,
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setNumber("BACK_SPACE")}
        >
          <Ionicons name="backspace-outline" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
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
