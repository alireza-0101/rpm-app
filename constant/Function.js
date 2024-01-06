import AsyncStorage from "@react-native-async-storage/async-storage"

export const emailRegex = /^.+@\w+\.\w{2,3}$/g

export const isCurrectLoginData = (state) => {
  if (
    state.name.trim() != "" &&
    state.email.trim() != "" &&
    state.pin.length >= 4 &&
    emailRegex.test(state.email)
  ) {
    return true
  }

  return false
}

export const isLogin = async () => {
  const name = await AsyncStorage.getItem(StorageKeys.name)
  const email = await AsyncStorage.getItem(StorageKeys.email)
  const pin = await AsyncStorage.getItem(StorageKeys.pin)

  let isUserLogin = name && email && emailRegex.test(email) && pin.length >= 4

  return isUserLogin
}
