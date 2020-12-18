import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A9A9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewBorders: {
    borderColor: 'black',
    borderWidth: 1,
  },
  textInputStyle: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    height: 50,
    width: 50,
  },
  topView: {
    padding: 50,
    flexDirection: 'row',
    height: 400,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  textInputView: {
    backgroundColor: '#8A8F83',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAndButtonPicker: {
    backgroundColor: 'purple',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerStyle : {
    height: 50,
    width: 50,
  }
});

const App = () => {
  const [selectedValue, setSelectedValue] = useState("java");
  const [value, onChangeText] = React.useState()
  return (
    <View id = 'MainView'>
     <View style = {styles.topView}>
        <View style = {styles.textInputView}>
        <TextInput
          style = {styles.textInputStyle}
          onChangeText = {text => onChangeText(text)}
          value = {value}
          placeholder = "Buraya yazınız."
        />
        </View>
        <View style = {styles.viewAndButtonPicker}>
        <Picker
          style = {styles.pickerStyle}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        </View>
      </View>
    <StatusBar style="auto" />
  </View>
  );
}

export default App