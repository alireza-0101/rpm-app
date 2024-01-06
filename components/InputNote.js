import { View, Text } from "react-native"
import Colors from "../constant/Colors"
import { Ionicons } from "@expo/vector-icons"

const InputNote = (props) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : Colors.header,
        borderRadius: 15,
        padding: 20,
        marginBottom: 10,
        ...props.wrapperStyle,
      }}
    >
      {props.title && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: props.content ? 5 : 0,
          }}
        >
          {props.icon && (
            <Ionicons
              name={props.icon}
              size={24}
              color={props.textColor ? props.textColor : Colors.text}
            />
          )}
          <Text
            style={{
              fontSize: 16,
              color: props.textColor ? props.textColor : Colors.text,
              marginLeft: 5,
            }}
          >
            {props.title ? props.title : "Point"}
          </Text>
        </View>
      )}
      {props.content && (
        <View>
          <Text
            style={{
              fontSize: 12,
              color: props.textColor ? props.textColor : Colors.text,
              marginRight: 5,
              lineHeight: 22,
            }}
          >
            {props.content}
          </Text>
        </View>
      )}
    </View>
  )
}

export default InputNote
