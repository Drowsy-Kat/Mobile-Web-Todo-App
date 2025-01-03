import { StyleSheet, FlatList } from "react-native";
import { useRef, useEffect } from "react";
import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "@/app/(tabs)";

const TodoItems = () => {
  const { todos } = useContext(TodoContext);

  const flatListRef = useRef();

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [todos]);

  return (
    <FlatList
      ref={flatListRef}
      data={todos}
      renderItem={({ item }) => <TodoItem todo={item} />}
      keyExtractor={(todo) => todo.id.toString()}
      contentContainerStyle={styles.flatListContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TodoItems;

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
});
