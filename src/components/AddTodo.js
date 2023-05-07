import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axiosInstance from "../axiosInstance";

function AddTodo({ addTodo }) {
  const toast = useToast();
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!content) {
      toast({
        title: "No content",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Make a POST request to create a new todo
    axiosInstance
      .post("http://localhost:3001/api/v1/habbits/", {
        name: content,
        is_completed: false,
      })
      .then((response) => {
        // If the request is successful, update the todos list in the parent component
        addTodo(response.data);
        // Clear the input field
        setContent("");
      })
      .catch((error) => {
        // If there's an error, log it to the console message
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="20">
        <Input
          varient="filled"
          placeholder="Add new Habbit to develop.. "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          size="lg"
        />
        <Button colorScheme="pink" px="8" type="submit">
          Add Habit
        </Button>
      </HStack>
    </form>
  );
}

export default AddTodo;
