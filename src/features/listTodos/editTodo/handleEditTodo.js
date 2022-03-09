import { BACKEND } from "../../../common/constants";

const handleEditTodo = async (
  modalDescription,
  todos,
  setTodos,
  todo_uid,
  user,
  isDone
) => {
  const token = user.data.token;
  const body = {
    data: {
      type: "todo",
      id: todo_uid,
      attributes: {
        description: modalDescription,
        isDone,
      },
    },
  };

  const response = await fetch(`${BACKEND}/todos/${todo_uid}`, {
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
          created: new Date(result.attributes.timestamps.created),
          isDone: result.attributes.isDone,
        };
      return entry;
    });
    setTodos(newTodos);
  }
};

export default handleEditTodo;
