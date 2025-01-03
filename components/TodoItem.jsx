import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { TodoContext } from "@/app/(tabs)";

const TodoItem = ({ todo }) => {
  const { toggleTodo, removeTodo } = useContext(TodoContext);
  return (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, todo.completed && styles.compleatedText]}
        onPress={() => toggleTodo(todo.id)}
      >
        {todo.title}
      </Text>
      <Pressable onPress={() => removeTodo(todo.id)}>
        <Entypo
          name="circle-with-cross"
          size={36}
          color="red"
          selectable={undefined}
        />
      </Pressable>
    </View>
  );
};

export default TodoItem;

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
});
