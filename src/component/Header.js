import React from "react";
import { View } from "react-native";

const Header = props => {
  return <View style={styles.ViewStyle}>{props.children}</View>;
};

const styles = {
  ViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#00A86B",
    elevation: 2
  }
};

export default Header;
