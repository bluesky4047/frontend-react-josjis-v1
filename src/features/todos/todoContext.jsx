import { createContext, useContext } from "react";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "./todoApi";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  // RTK Query hooks
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTodosQuery();

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  // Wrap mutations for easier usage
  const addTodo = async (data) => {
    return await createTodo(data);
  };

  const editTodo = async (id, data) => {
    return await updateTodo({ id, ...data });
  };

  const removeTodo = async (id) => {
    return await deleteTodo(id);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading: isLoading,
        error: isError ? error : null,
        refetch,
        addTodo,
        editTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
