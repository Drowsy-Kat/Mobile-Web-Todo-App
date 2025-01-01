import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const TaskInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Task"
        placeholderTextColor="grey"
        value={props.text}
        onChangeText={props.setText}
      />
      <Pressable onPress={props.addTodo} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </Pressable>
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
