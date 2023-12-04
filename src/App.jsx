// import { useState } from 'react'
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import SideNav from "./components/Nav";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <SideNav />
      </BrowserRouter>
    </>
  );
}

export default App;
