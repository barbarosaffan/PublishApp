import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const App = () => {
  // Input ve girilen veriyi kaydetmek için.
  const [enteredPost, setEnteredPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [publishments, setPublishments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    const res = await fetch(
      "https://ieee-mobil-test.herokuapp.com/api/post"
    ).then((response) => response.json());
    setPosts(res.data);
    setLoading(false);
    console.log(res.messages[0]);
    console.log(res.data[0].content);
  };

  const deletePosts = () => {
    fetch("https://ieee-mobil-test.herokuapp.com/api/post/3", {
      method: "DELETE",
    });
  };

  const PostInputHandler = (enteredText) => {
    setEnteredPost(enteredText);
  };
  // FlatList için.
  const addPostHandler = () => {
    setPublishments((currentBlogs) => [
      ...currentBlogs,
      { id: Math.random().toString(), value: enteredBlog },
    ]);
    fetch('https://ieee-mobil-test.herokuapp.com/api/post', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        id : '2',
        name : '${}',
        content : '${enteredPost}',
        category_name: '${selectedCategory}',
      })
    }
    );
  };
  // Picker için.
  const [selectedCategory, setSelectedCategory] = useState("Kategori");

  const renderPosts = ({ item }) => (
    <View style={styles.postList}>
      <View style={styles.postContent}>
      <Text>{item.category_name}</Text>
      <Text>{item.content}</Text>
      </View>
      <View style={styles.postDeleteButtonContainer}>
        <Button
          onPress = {deletePosts}
          title="Sil"
          color="#d10000"
        />
      </View>
    </View>
  );

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View style={styles.screen}>
      { loading ? 
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="red" />
      </View>
      :
      <View style={styles.mainView}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Buraya yazınız"
            style={styles.input}
            onChangeText={PostInputHandler}
            value={enteredPost}
          />
          <Button title="GÖNDER" onPress={addPostHandler} />
        </View>
        <View style={styles.pickerContainer}>
          <Text>Kategori: </Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Bilim" value="Bilim" />
            <Picker.Item label="Sanat" value="Sanat" />
            <Picker.Item label="Kültür" value="Kültür" />
            <Picker.Item label="Spor" value="Spor" />
          </Picker>
        </View>
        <FlatList
          data={posts}
          renderItem={renderPosts}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      }
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    backgroundColor: "#91C7FF",
    flex: 3,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pickerStyle: {
    width: "40%",
    height: 40,
  },
  postList: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#C3E0FF",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postDeleteButtonContainer: {
    width: 50,
    borderColor: "black",
    borderWidth: 0.5,
  },
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
