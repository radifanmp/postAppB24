import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import axios from "axios";

const Posts = (props) => {
  // Init State
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //LifeCycle
  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error Fetch Data");
        setIsLoading(false);
      });
  };

  const _renderItem = ({ item }) => {
    return (
      <ListItem
        onPress={() => props.navigation.navigate("DetailPost", item)}
        key={item.id.toString()}
        bottomDivider
      >
        <Avatar
          rounded
          title={item.title.slice(0, 2)}
          containerStyle={{ backgroundColor: "black" }}
        />
        <ListItem.Content>
          <ListItem.Title h4 numberOfLines={1}>
            {item.title}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={2}>{item.body}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={style.container}>
      <View>
        <FlatList
          data={post}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isLoading}
          onRefresh={getPost}
        />
      </View>
    </View>
  );
};

export default Posts;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
