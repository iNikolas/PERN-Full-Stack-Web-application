import { BACKEND, INITIAL_LINK } from "../../common/constants";

const handleFormSubmit = async (
  description,
  setDescription,
  todos,
  setTodos,
  pagination,
  setCurrentPage,
  user
) => {
  try {
    const token = user.data.token;
    const body = {
      data: {
        type: "todo",
        attributes: { description },
      },
    };
    const response = await fetch(`${BACKEND}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const resultRaw = await response.json();
    const result = resultRaw.data;
    const newTodo_uid = result.id;
    const newTodoDescription = result.attributes?.description;

    if (newTodo_uid) {
      setDescription("");
      if (pagination.links.self !== INITIAL_LINK)
        return setCurrentPage(INITIAL_LINK);
      setTodos([
        {
          todo_uid: newTodo_uid,
          description: newTodoDescription,
          created: new Date(result.attributes.timestamps.created),
        },
        ...todos,
      ]);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default handleFormSubmit;
