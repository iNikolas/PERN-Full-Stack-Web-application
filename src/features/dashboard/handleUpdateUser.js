import { backend } from "../../common/constants";
import handleToastErrorCreation from "../../common/ToastError/handleToastErrorCreation";

const handleUpdateUser = async (body, user, setUser, setError) => {
  const token = user.data.token;

  const response = await fetch(`${backend}/users/${body.data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const newName = body.data.attributes.newName;
    if (newName) {
      user.data.attributes.name = newName;
      setUser({ ...user });
    }
    return "success";
  }

  await handleToastErrorCreation(response, setError);
};

export default handleUpdateUser;
