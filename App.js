import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// ? Screens ==>

import PasswordListScreen, {
  screenOptions as PasswordListScreenOptions,
} from "./screens/PasswordListScreen"

import AddPasswordScreen, {
  screenOptions as AddPasswordScreenOptions,
} from "./screens/AddPasswordScreen"

import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from "./screens/LoginScreen"

import PinScreen, {
  screenOptions as PinScreenOptions,
} from "./screens/PinScreen"

import AuthScreen, {
  screenOptions as AuthScreenOptions,
} from "./screens/AuthScreen"

import SettingsScreen, {
  screenOptions as SettingsScreenOptions,
} from "./screens/SettingsScreen"

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={AuthScreenOptions}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={LoginScreenOptions}
        />

        <Stack.Screen
          name="Pin"
          component={PinScreen}
          options={PinScreenOptions}
        />

        <Stack.Screen
          name="PasswordList"
          component={PasswordListScreen}
          options={PasswordListScreenOptions}
        />

        <Stack.Screen
          name="AddPassword"
          component={AddPasswordScreen}
          options={AddPasswordScreenOptions}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={SettingsScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
