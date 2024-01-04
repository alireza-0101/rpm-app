import { FlatList, Text, TouchableOpacity, View } from "react-native"
import Colors from "../constant/Colors"
import PasswordCard from "../components/PasswordCard"
import { HeaderLeft, HeaderRight } from "../components/Header"
import { useEffect } from "react"

export default function PasswordListScreen({ navigation }) {
  const DATA = [
    {
      id: "bd7acbgea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      username: "Alireza_2020@go",
      password: "8#4d4z97mJ36",
    },
    {
      id: "3ac68afc-cg605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      username: "Alireza_2020@go",
      password: "8#4d4z97mJ36",
    },
    {
      id: "58694a0f-3dag1-471f-bd96-145571e29d72",
      title: "Third Item",
      username: "Alireza_2020@go",
      password: "8#4d4z97mJ36",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      username: "Alireza_2020@go",
      password: "8#4d4z97mJ36",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      username: "Alireza_2020@go",
      password: "8#4d4z97mJ36",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      username: "Alireza_2020@go",
      password: "8#4d4z97mJ36",
    },
  ]

  useEffect(() => {
    const focused = navigation.addListener("beforeRemove", (ev) => {
      ev.preventDefault()
    })

    return focused
  }, [navigation])

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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        style={{
          width: "100%",
        }}
        renderItem={({ item }) => <PasswordCard {...item} />}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
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
