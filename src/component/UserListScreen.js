import React from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import Header from "./Header";
import CustomButton from "./CustomButton";

class UserListScreen extends React.Component {
  constructor() {
    super();
    this.state = { fname: "", lname: "", id: "", data: [] };
  }

  componentWillMount() {
    this.getListOfNames();
  }

  getListOfNames = () => {
    return fetch("https://infinite-reaches-76044.herokuapp.com/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response)
      .then(resJson => resJson._bodyText)
      .then(name => {
        const parsedResponse = JSON.parse(name);
        this.setState({ data: parsedResponse });
      })
      .catch(err => {
        console.log(err);
      });
  };

  UpdateUser = () => {
    const data = {
      id: this.state.id,
      name1: this.state.fname,
      name2: this.state.lname
    };
    fetch("https://infinite-reaches-76044.herokuapp.com/userupdated", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  changedText = (typedText, field) => {
    this.setState({ [field]: typedText });
  };

  render() {
    return (
      <View>
        <Header>
          <Text style={styles.textStyles}>Update User</Text>
        </Header>
        <TextInput
          style={styles.inputStyle}
          placeholder="Choose ID"
          onChangeText={text => this.changedText(text, "id")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="New First Name"
          onChangeText={text => this.changedText(text, "fname")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="New Last Name"
          onChangeText={text => this.changedText(text, "lname")}
        />
        <CustomButton onPress={this.UpdateUser}>
          <Text style={styles.buttonText}>Submit</Text>
        </CustomButton>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 30,
                marginLeft: 20
              }}
            >
              <Text style={{ fontSize: 20, color: "#00A86B" }}>
                [{item.id}] {item.first_name} - {item.last_name}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    margin: 10
  },
  textStyles: {
    fontSize: 30,
    margin: 10,
    color: "#fff",
    fontWeight: "bold"
  },
  buttonText: {
    fontSize: 20,
    color: "#00A86B"
  },
  inputStyle: {
    fontSize: 20,
    margin: 10
  }
});
