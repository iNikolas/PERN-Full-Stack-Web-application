const handleGetTodos = async (currentPage, setTodos, setPagination, user, setWorking) => {
  try {
    setWorking(true)

    const token = user.data.token;

    const responseRaw = await fetch(currentPage, {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await responseRaw.json();
    const allTodosRaw = response.data;
    const { links, meta } = response;
    const allTodos = [];

    setPagination({ links, meta });

    allTodosRaw.forEach((todoEntry) => {
      const newTodo = {
        todo_uid: todoEntry.id,
        description: todoEntry.attributes.description,
        created: new Date(todoEntry.attributes.timestamps.created),
      };

      allTodos.push(newTodo);
    });

    setTodos(allTodos);
  } catch (error) {
    console.error(error.message);
  } finally {
    setWorking(false)
  }
};

export default handleGetTodos;
