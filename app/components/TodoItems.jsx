import { StyleSheet, FlatList, Text, View, Pressable } from "react-native";
import { useRef, useEffect } from "react";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";

const TodoItems = ({ todos, toggleTodo, removeTodo }) => {
  const flatListRef = useRef();
  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [todos]);

  const todoRenderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, item.completed && styles.compleatedText]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <Entypo
          name="circle-with-cross"
          size={36}
          color="red"
          selectable={undefined}
        />
      </Pressable>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={todos}
      renderItem={todoRenderItem}
      keyExtractor={(todo) => todo.id.toString()}
      contentContainerStyle={styles.flatListContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TodoItems;

const styles = StyleSheet.create({
  todoItem: {
    padding: 15,
    backgroundColor: "rgb(28, 30, 32)",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "rgb(97, 97, 97)",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Inter_500Medium",
  },
  compleatedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
});
