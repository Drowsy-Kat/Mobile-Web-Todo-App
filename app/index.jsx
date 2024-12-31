import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { data } from "@/data/todos";

const { height, width } = Dimensions.get("window");

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");

  const flatListRef = useRef();

  const addTodo = () => {
    if (text.trim()) {
      const newId =
        todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

      setTodos((t) => [...t, { id: newId, title: text, completed: false }]);
      setText("");
    }
  };

  document.title = "To-Do App";

  const toggleTodo = (id) => {
    setTodos((t) =>
      t.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

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

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [todos]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(12, 12, 12)" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "android" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "android" ? 60 : 0}
        ></KeyboardAvoidingView>

        <FlatList
          ref={flatListRef}
          data={todos}
          renderItem={todoRenderItem}
          keyExtractor={(todo) => todo.id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Task"
            placeholderTextColor="grey"
            value={text}
            onChangeText={setText}
          />
          <Pressable onPress={addTodo} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(22, 22, 22)",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    fontSize: width > 400 ? 16 : 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#3073ee",
    shadowColor: "#3073ee",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    backgroundColor: "rgb(48, 48, 48)",
    color: "rgb(214, 214, 214)",
    borderRadius: 5,
    flex: 1,
  },
  addButton: {
    backgroundColor: "rgb(48, 48, 48)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    textAlign: "center",
    width: 100,
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: width > 400 ? 17 : 15,
    fontWeight: "bold",
    color: "rgb(214, 214, 214)",
    textAlign: "center",
  },
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
//followed the tutorial below for some help
//https://www.youtube.com/watch?v=sm5Y7Vtuihg
