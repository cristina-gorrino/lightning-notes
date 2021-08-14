import React, { useState, useEffect } from "react";

import Login from "./components/Login";
import Note from "./components/Note";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return <div className="App">{isLogin ? <Note /> : <Login />}</div>;
}

export default App;
