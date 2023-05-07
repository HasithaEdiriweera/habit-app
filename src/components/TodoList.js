import { React, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import {
  VStack,
  HStack,
  Text,
  IconButton,
  StackDivider,
  Spacer,
  Badge,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditTodo from "./EditTodo";

function TodoList({ todos, deleteTodo, editTodo }) {
  const [editMode, setEditMode] = useState({});
  if (!todos.length) {
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        No Todos, Yay!!!
      </Badge>
    );
  }

  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems="stretch"
    >
      {todos.map((todo) => (
        <HStack key={todo.id}>
          {editMode[todo.id] ? (
            <EditTodo
              todo={todo}
              editTodo={(name) => {
                editTodo(todo.id, name);
                setEditMode({ ...editMode, [todo.id]: false });
              }}
            />
          ) : (
            <>
              <Text>{todo.name}</Text>
              <Spacer />
              <Tooltip label="Delete" fontSize="md">
                <IconButton
                  icon={<FaTrash />}
                  isRound="true"
                  onClick={() => deleteTodo(todo.id)}
                />
              </Tooltip>
              <Tooltip label="Edit" fontSize="md">
                <IconButton
                  icon={<FaEdit />}
                  isRound="true"
                  onClick={() => setEditMode({ ...editMode, [todo.id]: true })}
                />
              </Tooltip>
            </>
          )}
        </HStack>
      ))}
    </VStack>
  );
}

export default TodoList;
