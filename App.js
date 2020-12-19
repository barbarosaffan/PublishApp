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
  itemList: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
});

const App = () => {
  const [enteredBlog, setEnteredBlog] = useState('');
  const [publishments, setPublishments] = useState([]);

  const BlogInputHandler = (enteredText) => {
    setEnteredBlog(enteredText);
  };
  const addBlogHandler = () => {
    setPublishments(currentBlogs => [
      ...currentBlogs, 
      { key: Math.random().toString(), value: enteredBlog }
    ]);
  };

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
      <FlatList 
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
