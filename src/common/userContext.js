import React, { createContext, useEffect, useState } from "react";
import { backend } from "./constants";
import Loader from "./Loader";

export const UserContext = createContext([null, (user) => user]);

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [working, setWorking] = useState(true);

  useEffect(() => {
    handleRefreshToken(setUser, setWorking);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {working ? <Loader /> : props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

const handleRefreshToken = async (setUser, setWorking) => {
  try {
    const response = await fetch(`${backend}/users/token`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
      },
      credentials: "include",
    });

    const goodResponse = response.ok;

    const userData = await response.json();
    const expiresInSec = userData.meta?.expiresInSec || 300;

    if (goodResponse) setUser(userData);

    setTimeout(() => {
      handleRefreshToken(setUser, setWorking);
    }, expiresInSec * 1000 - 1000);
  } catch (error) {
    console.error(error.message);
  } finally {
    setWorking(false);
  }
};
