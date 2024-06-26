import {
  Alert,
  FlatList,
  LayoutAnimation,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native"
import Colors from "../constant/Colors"
import PasswordCard from "../components/PasswordCard"
import { HeaderLeft, HeaderRight } from "../components/Header"
import { useEffect, useReducer } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import StorageKeys from "../constant/StorageKeys"
import InputNote from "../components/InputNote"

const SET_PASSWORDS = "SET_PASSWORDS"

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PASSWORDS: {
      return {
        ...state,
        passwords: action.value,
      }
    }

    default: {
      return state
    }
  }
}

export default function PasswordListScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, {
    passwords: [],
  })

  const goToAddNew = () => {
    navigation.navigate("AddPassword")
  }

  const getPasswords = async () => {
    let passwords_json = await AsyncStorage.getItem(StorageKeys.passwords)
    let passwords = await JSON.parse(passwords_json)

    dispatch({
      type: SET_PASSWORDS,
      value: passwords || [],
    })
  }

  useEffect(() => {
    const focused = navigation.addListener("focus", () => {
      getPasswords()
    })

    return focused
  }, [navigation])

  const layoutAnimConfig = {
    duration: 1000,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  }

  const deleteItem = async (id) => {
    const last_passwords = [...state.passwords]

    const filtered_passwords = last_passwords.filter(
      (password) => password.id !== id
    )

    const filtered_passwords_json = JSON.stringify(filtered_passwords)

    await AsyncStorage.setItem(StorageKeys.passwords, filtered_passwords_json)
    
    await getPasswords()
    
    LayoutAnimation.configureNext(layoutAnimConfig.delete)
    ToastAndroid.show("Deleted successfully!", ToastAndroid.SHORT)
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background,
        padding: 20,
      }}
    >
      {state.passwords.length === 0 && (
        <InputNote
          icon="apps-outline"
          title="The list is empty!"
          backgroundColor={Colors.header}
          content="You can go to the add password section with the button below and add an item to this list from there."
        />
      )}

      {state.passwords?.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={state.passwords}
          style={{
            width: "100%",
          }}
          renderItem={({ item }) => (
            <PasswordCard {...item} onDelete={deleteItem} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <TouchableOpacity
        onPress={goToAddNew}
        style={{
          backgroundColor: Colors.header,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          marginTop: 20,
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
          Add New Password
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
