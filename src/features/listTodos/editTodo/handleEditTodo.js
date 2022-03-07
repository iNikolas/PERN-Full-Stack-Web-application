import { backend } from "../../../common/constants";

const handleEditTodo = async (
  modalDescription,
  todos,
  setTodos,
  todo_uid,
  user
) => {
  const token = user.data.token;
  const body = {
    data: {
      type: "todo",
      id: todo_uid,
      attributes: {
        description: modalDescription,
      },
    },
  };

  const response = await fetch(`${backend}/todos/${todo_uid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const resultRaw = await response.json();
  const result = resultRaw.data;

  if (result) {
    const newTodos = todos.map((entry) => {
      if (entry.todo_uid === result.id)
        return {
          todo_uid: result.id,
          description: result.attributes.description,
        };
      return entry;
    });
    setTodos(newTodos);
  }
};

export default handleEditTodo;
