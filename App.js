import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '70%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pickerStyle: {
    width: '40%',
    height: 40,
  },
  itemList: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
});

const App = () => {
  // Input ve girilen veriyi kaydetmek için.
  const [enteredBlog, setEnteredBlog] = useState('');
  const [publishments, setPublishments] = useState([]);

  const BlogInputHandler = (enteredText) => {
    setEnteredBlog(enteredText);
  };
  // FlatList için.
  const addBlogHandler = () => {
    setPublishments(currentBlogs => [
      ...currentBlogs, 
      { id: Math.random().toString(), value: enteredBlog }
    ]);
  };
  // Picker için.
  const [selectedValue, setSelectedValue] = useState("Kategori");
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Buraya yazınız"
          style={styles.input}
          onChangeText={BlogInputHandler}
          value={enteredBlog}
        />
        <Button title="GÖNDER" onPress={addBlogHandler} />
      </View>
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={selectedValue}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Bilim" value="bilim"/>
          <Picker.Item label="Sanat" value="sanat"/>
          <Picker.Item label="Kültür" value="kütlür"/>
          <Picker.Item label="Spor" value="spor"/>
        </Picker>
      </View>
      <FlatList 
        keyExtractor={(item, index) => item.id}
        data={publishments} 
        renderItem={itemData=> (
          <View style={styles.itemList}>
            <Text>{itemData.item.value}</Text>
          </View>  
        )}
      />  
    </View> 
  );
}

export default App
