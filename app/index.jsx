import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";

import { data } from "@/data/todos";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import TodoItems from "./components/TodoItems";

const { height, width } = Dimensions.get("window");

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) {
    return null;
  }

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

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(12, 12, 12)" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "android" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "android" ? 60 : 0}
        ></KeyboardAvoidingView>

        <TodoItems todos={todos} />

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
    fontFamily: "Inter_500Medium",
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
});
//followed the tutorial below for some help
//https://www.youtube.com/watch?v=sm5Y7Vtuihg
