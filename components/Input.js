import { useRef, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import Colors from "../constant/Colors"

const Input = ({
  title,
  multiline,
  style,
  inputStyle,
  value,
  setValue,
  id,
  keyboardType,
}) => {
  return (
    <View style={{ width: "100%", position: "relative", ...style }}>
      <TextInput
        value={value}
        onChangeText={(ev) => {
          setValue(id, ev)
        }}
        id={id}
        multiline={multiline}
        style={{
          width: "100%",
          height: multiline ? 200 : "auto",
          paddingRight: 12,
          paddingLeft: 12,
          paddingTop: 16,
          paddingBottom: 16,
          borderColor: "#999",
          borderStyle: "solid",
          borderWidth: 2,
          borderRadius: 8,
          color: "#fff",
          ...inputStyle
        }}
        keyboardType={keyboardType ? keyboardType : "default"}
      />

      <View
        style={{
          backgroundColor: Colors.background,
          position: "absolute",
          top: -7,
          left: 20,
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        <Text
          style={{
            color: "#999",
            fontSize: 13,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  )
}

export default Input
