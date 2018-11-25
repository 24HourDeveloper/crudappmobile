import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import Header from "./src/component/Header";
import CustomButton from "./src/component/CustomButton";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      data: []
    };

    this.insertUser = this.insertUser.bind(this);
    this.changedText = this.changedText.bind(this);
  }

  changedText = (typedText, field) => {
    this.setState({ [field]: typedText });
  };

  insertUser = () => {
    const data = { name1: this.state.fname, name2: this.state.lname };
    fetch("https://infinite-reaches-76044.herokuapp.com/useradded2", {
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

  render() {
    return (
      <View>
        <Header>
          <Text style={styles.textStyles}>Add User</Text>
        </Header>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter First Name"
          onChangeText={text => this.changedText(text, "fname")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Last Name"
          onChangeText={text => this.changedText(text, "lname")}
        />

        <CustomButton onPress={this.insertUser}>
          <Text style={styles.buttonText}>Add User</Text>
        </CustomButton>

        <CustomButton onPress={this.getListOfNames.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </CustomButton>

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 30 }}>
              <Text style={{ fontSize: 20 }}>
                {item.first_name} - {item.last_name}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

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
