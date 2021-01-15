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
  const [enteredBlog, setEnteredBlog] = useState("");
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

  const BlogInputHandler = (enteredText) => {
    setEnteredBlog(enteredText);
  };
  // FlatList için.
  const addBlogHandler = () => {
    setPublishments((currentBlogs) => [
      ...currentBlogs,
      { id: Math.random().toString(), value: enteredBlog },
    ]);
  };
  // Picker için.
  const [selectedValue, setSelectedValue] = useState("Kategori");

  const renderPosts = ({ item }) => (
    <View style={styles.postList}>
      <Text>{item.category_name}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="red" />
      </View>

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
        <Text>Kategori: </Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.pickerStyle}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
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
  },
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
