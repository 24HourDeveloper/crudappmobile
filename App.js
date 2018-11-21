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
      text: "Hey",
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
        const temp = JSON.parse(name);
        this.setState({ data: temp });
        //console.log(temp);

        return this.setState({ text: temp });
      })
      .catch(err => {
        console.log(err);
      });
    return bug;
  }
  changedText = typedText => {
    this.setState({ fname: typedText });
  };
  changedText2 = typedText => {
    this.setState({ lname: typedText });
  };

  insertUser() {
    // fetch("https://infinite-reaches-76044.herokuapp.com/useradded", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     first: "Hello",
    //     second: "Bye"
    //   })
    // })
    //   .then(response => response)
    //   .then(res => console.log(res.json.first))
    //   .catch(err => console.log(err));
    console.log(this.setState({ bText: this.state.fname }));
    this.setState({ lText: this.state.lname });
  }

  render() {
    //Looping through fetch response
    // // const arr = this.state.text;
    // // const names = [];
    // // for (let i = 0; i < arr.length; i++) {
    // //   names.push(
    // //     <View key={i}>
    // //       <Text style={styles.textStyles}>
    // //         {arr[i].id}) {arr[i].first_name} - {arr[i].last_name}
    // //       </Text>
    // //     </View>
    // //   );
    // }

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter First Name"
          value={this.state.fname}
          onChangeText={this.changedText}
        />
        <TextInput
          placeholder="Enter Last Name"
          value={this.state.lname}
          onChangeText={this.changedText2}
        />
        <Text>
          {this.state.bText} - {this.state.lText}
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

        {/* {names} reference to for loop*/}
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
