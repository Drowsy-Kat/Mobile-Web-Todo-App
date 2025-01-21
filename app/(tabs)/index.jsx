import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, createContext } from "react";

import { data } from "@/data/todos";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import TodoItems from "../../components/TodoItems";
import TaskInput from "../../components/TaskInput";

export const TodoContext = createContext();

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState("");

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) {
    return null;
  }
  // sets the page title to To-Do App on the web
  if (Platform.OS === "web") {
    document.title = "To-Do App";
  }

  //  function to add new todo to the list
  const addTodo = () => {
    if (text.trim()) {
      //create a id for the new todo
      const newId =
        todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

      setTodos((t) => [...t, { id: newId, title: text, completed: false }]);
      setText("");
    }
  };

  // toggles a todos compleated status
  const toggleTodo = (id) => {
    setTodos((t) =>
      t.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  //removes a todo
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      {/* set the colour of the status bar on mobile devices */}
      <StatusBar barStyle="light-content" backgroundColor="rgb(12, 12, 12)" />

      {/* safe area stops items from displaying where they will be cut out due to the device shape e.g: rounded corners or camera notches */}
      <SafeAreaView style={styles.container}>
        <TodoContext.Provider value={{ toggleTodo, removeTodo, todos }}>
          <TodoItems />
        </TodoContext.Provider>

        <TaskInput text={text} setText={setText} addTodo={addTodo} />
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
});
//followed the tutorial below for some help
//https://www.youtube.com/watch?v=sm5Y7Vtuihg
