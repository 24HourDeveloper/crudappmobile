/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from "react-native";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      bText: "",
      lText: "",
      data: []
    };
    this.handlePress = this.handlePress.bind(this);
    this.insertUser = this.insertUser.bind(this);
  }

  handlePress() {
    let bug;
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
  }
  changedText = (typedText, field) => {
    this.setState({ [field]: typedText });
  };

  insertUser = () => {
    const data = { first: "Hello", last: "Bye" };
    fetch("https://infinite-reaches-76044.herokuapp.com/useradded", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => console.log(response))
      .catch(err => console.log(err));

    //console.log(this.setState({ userFirstName: this.state.fname }));
    this.setState({ userLastName: this.state.lname });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter First Name"
          onChangeText={text => this.changedText(text, "fname")}
        />
        <TextInput
          placeholder="Enter Last Name"
          onChangeText={text => this.changedText(text, "lname")}
        />
        <Text>
          {this.state.userFirstName} - {this.state.userLastName}
        </Text>
        <Button title="Add User" onPress={this.insertUser} />
        <View style={styles.container2}>
          <Button title="Submit" onPress={this.handlePress} />
        </View>
        <Text style={{ fontSize: 30 }}>List Of Names</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.container2}>
              <Text style={{ fontSize: 20 }}>
                {item.first_name} - {item.last_name}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
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
  container2: {
    marginTop: 10
  },
  textStyles: {
    fontSize: 20,
    margin: 10
  }
});
