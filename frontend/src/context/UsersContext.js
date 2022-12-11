import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [currentUser, setCurrentuser] = useState({});

  return (
    <UserContext.Provider value={[currentUser, setCurrentuser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
