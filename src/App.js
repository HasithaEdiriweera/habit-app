// import logo from './logo.svg';
import "./App.css";
import { Heading, Box } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:3001/api/v1/habbits/")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteTodoItem = (id) => {
    axiosInstance
      .delete(`http://localhost:3001/api/v1/habbits/${id}`)
      .then((response) => {
        // Handle success
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    deleteTodoItem(id);
    setTodos(newTodos);
  }

  function editTodo(id, name) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, name } : todo
    );
    setTodos(updatedTodos);
  }

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound="true"
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      ></IconButton>
      <Box>
        <Heading
          mt="20"
          mb="8"
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-r, pink.500, pink.500, blue.500)"
          bgClip="text"
        >
          Habit Development Application
        </Heading>
      </Box>
      <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
      <AddTodo addTodo={addTodo} />
    </VStack>
  );
}

export default App;
