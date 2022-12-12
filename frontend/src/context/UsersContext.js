import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
