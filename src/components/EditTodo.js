import { React, useState } from "react";
import { HStack, Input, Button } from "@chakra-ui/react";
import axiosInstance from "../axiosInstance";

function EditTodo({ todo, editTodo }) {
  const [name, setBody] = useState(todo.name);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a PUT request to update the todo
    axiosInstance
      .put(`http://localhost:3001/api/v1/habbits/${todo.id}`, {
        name: name,
        is_completed: false,
      })
      .then((response) => {
        // If the request is successful, update the todos list in the parent component
        editTodo(response.data.name);
      })
      .catch((error) => {
        // If there's an error, log it to the console
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack w="100%">
        <Input value={name} onChange={(e) => setBody(e.target.value)} />
        <Button type="submit">Save</Button>
      </HStack>
    </form>
  );
}

export default EditTodo;
