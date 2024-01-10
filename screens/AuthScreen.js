import {
  FlatList,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native"
import Colors from "../constant/Colors"
import PasswordCard from "../components/PasswordCard"
import { HeaderLeft, HeaderRight } from "../components/Header"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import StorageKeys from "../constant/StorageKeys"

export default function AuthScreen({ navigation }) {
  const doInOrder = (isLogin) => {
    if (isLogin) {
      navigation.replace("Pin")
    } else {
      navigation.replace("Login")
    }
  }

  const authUser = async () => {
    const name = await AsyncStorage.getItem(StorageKeys.name)
    const email = await AsyncStorage.getItem(StorageKeys.email)
    const pin = await AsyncStorage.getItem(StorageKeys.pin)

    let isLogin = name && email && email.includes("@") && pin.length >= 4

    doInOrder(isLogin)
  }

  useEffect(() => {
    authUser()
  }, [])

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
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/adaptive-icon.png")}
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "200",
          color: "#fff",
        }}
      >
        RPM - PASSWORD
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "200",
          marginTop: 15,
          color: "#fff",
        }}
      >
        A Powerfull Password Manager
      </Text>
    </View>
  )
}

export const screenOptions = {
  headerShown: false,
  headerBackButtonMenuEnabled: false,
  headerTitle: "",
}
