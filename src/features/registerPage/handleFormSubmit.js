import { backend } from "../../common/constants";
import handleToastErrorCreation from "../../common/ToastError/handleToastErrorCreation";

const handleFormSubmit = (
  endPointString,
  name,
  password,
  passwordConfirm,
  setUser,
  setError,
  setWorking,
  setShowOverlay,
  setErrorClassName
) => {
  return async (event) => {
    event.preventDefault();
    try {
      setWorking(true);

      if (password !== passwordConfirm && endPointString === "") {
        setShowOverlay(true);
        setErrorClassName("error-state");
        throw new Error("Passwords do not match");
      }

      const body = {
        data: {
          type: "users",
          attributes: { name, password },
        },
      };

      const response = await fetch(`${backend}/users/${endPointString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (response.ok) return setUser(await response.json());

      await handleToastErrorCreation(response, setError);

      setWorking(false);
    } catch (error) {
      console.error(error.message);
      setWorking(false);
    }
  };
};

export default handleFormSubmit;
