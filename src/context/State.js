import React, { useEffect, useState } from "react";
import Context from "./Context";

const State = (props) => {
  const [notification, setNotification] = useState([]);
  return (
    <Context.Provider value={{ notification, setNotification }}>
      {props.children}
    </Context.Provider>
  );
};

export default State;
