import React, { createContext,useContext, useEffect, useState } from "react";
import axios from "axios";

const AccountContext = createContext();
const id = localStorage.getItem("user_id");

export const AccountProvider = ({ children }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("work");
    axios
      .get(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <AccountContext.Provider value={data}>{children}</AccountContext.Provider>
  );
};
export const useAccountContext = () => useContext(AccountContext);
