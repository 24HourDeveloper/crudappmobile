import React from "react";
import { TouchableOpacity } from "react-native";

const CustomButton = props => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#00A86B"
  }
};

export default CustomButton;
