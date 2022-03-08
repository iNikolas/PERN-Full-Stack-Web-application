import { BACKEND, PAGE_LIMIT } from "../../common/constants";

const handleDeleteTodo = async (
  todo_uid,
  todos,
  setTodos,
  user,
  currentPage,
  setCurrentPage
) => {
  try {
    const token = user.data.token;

    const response = await fetch(`${BACKEND}/todos/${todo_uid}`, {
      method: "DELETE",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      const newTodos = todos.filter((todoEntry) => {
        return todoEntry.todo_uid !== todo_uid;
      });

      if (newTodos.length === 0) {
        const currentOffset =
          currentPage.match(/page\[offset]=(?<pageOffset>\d+)/).groups
            .pageOffset || 0;
        const newOffset = currentOffset - PAGE_LIMIT;

        if (newOffset >= 0) {
          setCurrentPage(
            `${BACKEND}/todos?page[offset]=${newOffset}&page[limit]=${PAGE_LIMIT}`
          );
        } else {
          setTodos(newTodos);
        }
      } else {
        setTodos(newTodos);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default handleDeleteTodo;
